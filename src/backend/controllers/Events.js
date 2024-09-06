const model = require('../Models/Eventss');
const moment = require('moment');
const fs = require('fs').promises;
const nodemailer = require('nodemailer');
require('dotenv').config();

const CORREO = process.env.CORREO;
const PASS = process.env.PASS;

exports.createEvent = async (req, res) => {
  try {
    const newEvent = await model.create(req.body);
    res.status(200).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getData = async (req, res) => {
  try {
    const docs = await model.find({});
    res.send({ docs });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Error al obtener datos' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await model.findByIdAndDelete(req.params.id);
    res.json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventsByClient = async (req, res) => {
  const { ClientNit } = req.body;

  try {
    const events = await model.find({ nit: ClientNit });

    const currentDate = moment();

    for (const event of events) {
      for (const eventDate of event.dateTime) {
        const daysUntilEvent = moment(eventDate).diff(currentDate, 'days') + 1;

        if ((daysUntilEvent <= 5 && daysUntilEvent >= 1) && !event.emailSent) {
          const RecordatorioContentPromise = fs.readFile('../imagenes/recordatorio.png', { encoding: 'base64' });
          const FIRMAContentPromise = fs.readFile('../imagenes/FIRMA.png', { encoding: 'base64' });

          const [RecordatorioContent] = await Promise.all([RecordatorioContentPromise, FIRMAContentPromise]);

          const plantilla = `<!DOCTYPE html>
                            <html lang="es">
                              <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recordatorio</title>
</head>
<body style="display: flex; justify-content: center; align-items: center; background-color: #ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
        <div style="width: 90%; background-color: rgb(111, 0, 255); border-top-left-radius: 10px; border-top-right-radius: 10px; padding: 20px;">
            <div style="display: flex; justify-content: center; align-items: center;">
                <img src="data:image/png;base64,${RecordatorioContent}" style="width: 30%;">
                <h1 style="font-size: 50px; font-weight: 800; color: #ffd000;">
                    ¡No lo<br>olvides!
                    <p style="font-size: 18px; color: black;">
                        Se acercan vencimientos en tu <br>
                        <strong style="background-color: #ffd000; border-radius: 5px; padding: 2px 4px;">calendario tributario.</strong>
                    </p>
                </h1>
            </div>
        </div>
        <div>
        </div>
        <div style="width: 90%; background-color: #F8F4F9; padding: 20px;">
                    <p style="font-size: 18px; font-weight: bolder; text-align: center;">
                Esto es lo que debes tener presente<br>para los próximos días:
            </p>    
        <h3 style="font-size: 25px; font-weight: 600; color: #ffd000; text-align: center;">Obligaciones</h3>
            <hr style="width: 30%; max-width: 600px; border: none; border-top: 2px solid #6F00FF;">
            <ul style="display: flex; justify-content: center; padding: 0;">
                <li style="color: black; font-size: 18px;">
                    ${event.name} vencen en ${daysUntilEvent} días
                </li>
            </ul>
        </div>
        <div style="width: 90%; background-color: rgb(111, 0, 255); border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; padding: 20px;">
            <div style="text-align: center;">
                <p style="font-size: 15px; padding: 0 20px; color: #ffd000;">
                    Besitz SAS.<br>
                    Barranquilla, Atlantico.<br>
                </p>
                <p style="font-size: 13px; padding: 10px 0; color: #ffd000">
                    © 2024, todos los derechos reservados.
                </p>
            </div>
        </div>
    </div>
</body>
</html>
`;

          // Función para enviar el correo electrónico
          const sendEmail = (email) => {
            // Configurar el transporter de nodemailer
            const transporter = nodemailer.createTransport({
              service: 'godaddy',
              auth: {
                user: CORREO,
                pass: PASS,
              },
            });

            // Configurar el mensaje del correo electrónico
            const mailOptions = {
              from: CORREO,
              to: email,
              subject: 'Importante: Vencimiento',
              html: plantilla,
            };

            // Enviar el correo electrónico
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('Error al enviar el correo electrónico:', error);
              } else {
                console.log('Correo electrónico enviado:', info.response);
              }
            });
          };

          sendEmail(event.email);

          // Marcar el evento como emailSent: true en la base de datos
          await model.findByIdAndUpdate(event._id, { emailSent: true });

        } else if (daysUntilEvent < 0) {
          // Encontrar el índice del evento en la matriz
          const eventIndex = events.findIndex(e => e._id === event._id);
          if (eventIndex !== -1) {
            // Obtener la ID del evento de la base de datos
            const eventId = events[eventIndex]._id;
            // Eliminar el evento de la base de datos
            await model.findByIdAndDelete(eventId);
            console.log('Se eliminó el evento de la base de datos');
          } else {
            console.log('No se encontró el evento en la matriz');
          }
        }
      }
    }
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error al recuperar eventos por cliente' });
  }
};
