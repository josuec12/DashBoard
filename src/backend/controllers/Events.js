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
        console.log('dias que faltan', daysUntilEvent);

        // Verificar si el evento está a 5 días o 1 día de distancia y el correo electrónico no ha sido enviado
        if ((daysUntilEvent <= 5 && daysUntilEvent >= 1) && !event.emailSent) {
          const LblancoContentPromise = fs.readFile('../imagenes/Lblanco.png', { encoding: 'base64' });
          const FIRMAContentPromise = fs.readFile('../imagenes/FIRMA.png', { encoding: 'base64' });

          const [LblancoContent, FIRMAContent] = await Promise.all([LblancoContentPromise, FIRMAContentPromise]);

          const plantilla = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    p,
                    a,
                    h1,
                    h2,
                    h3,
                    h4,
                    h5,
                    h6 {
                        font-family: 'Roboto', sans-serif !important;
                    }

                    h1 {
                        font-size: 30px !important;
                    }

                    h2 {
                        font-size: 25px !important;
                    }

                    h3 {
                        font-size: 18px !important;
                    }

                    h4 {
                        font-size: 16px !important;
                    }

                    p,
                    a {
                        font-size: 15px !important;
                    }
                </style>
            </head>

            <body>
                <div style="width: 100%; background-color: #e3e3e3; border-radius: 10px;">
                    <div style="padding: 50px 20px 50px 20px;">
                        <!-- Imagen inicial -->
                        <div style="background-color: rgb(1, 0, 37); padding: 1px 0px 1px 0px; width: 100%; text-align: center;">
                            <img src="data:image/png;base64,${LblancoContent}" alt="" style="width: 140px; height: 180px;">
                        </div>
                        <!-- Imagen inicial -->

                        <!-- Contenido principal -->
                        <div style="background-color: #ffffff; padding: 10px 0px 0px 0px; width: 100%; text-align: center;">
                            <h1>Recordatorio</h1>
                            <p>Estimado/a, ${event.cliente}. Recuerde que su <strong>${event.name}</strong> se vence en ${daysUntilEvent} días.</p>
                            </p>

                            <img src="data:image/png;base64,${FIRMAContent}" alt="" style="width: 430px; height: 200px;">

                            <!-- Contenido principal -->

                            <!-- Footer -->
                            <div
                                style="background-color: #010024; color: #ffffff; padding: 10px 0px 0px 0px; width: 100%; text-align: center; margin-top: 5px;">
                                <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                                    Besitz SAS.<br>
                                    Barranquilla, Atlantico.<br>
                                </p>
                                <p style="background-color: #020013; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                                    © 2018, todos los derechos reservados.
                                </p>
                            </div>
                            <!-- Footer -->
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

        } else if (daysUntilEvent >= 0) {
          // Aquí tomar acciones cuando la fecha del evento haya llegado, como eliminar el evento
          await deleteEvent(event._id);
          console.log('Se elimino')
        }
      }
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error al recuperar eventos por cliente' });
  }
};
