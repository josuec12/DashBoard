const mongoose = require('mongoose');
const model = require('../Models/Adminss');
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
require('dotenv').config();

const CORREO = process.env.CORREO;
const PASS = process.env.PASS;


const successResponse = { success: true, message: 'Operación exitosa' };


const parseId = (id) => {
    return new mongoose.Types.ObjectId(id);
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

exports.insertData = async (req, res) => {
    try {
        const { nom, ape, cedula, passw, emaila } = req.body;

        const data = req.body;

        // Verificar si ya existe un documento con el mismo nit
        const existingDoc = await model.findOne({ cedula: data.cedula });

        if (existingDoc) {
            // El documento ya existe, decide qué hacer en este caso
            return res.status(409).json({ error: 'El nit ya existe.' });
        }

        // Crear una nueva instancia del modelo con los datos del cuerpo de la solicitud
        const newDoc = new model({
            nom,
            ape,
            cedula,
            passw,
            emaila
        });


        // Encriptar la contraseña antes de guardarla en la base de datos
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.passw, salt);

        // Sobreescribir la contraseña en el nuevo documento con la versión encriptada
        newDoc.passw = hashedPassword;

        // Guardar el nuevo documento en la base de datos
        const savedDoc = await newDoc.save();

        // Responder con el documento guardado
        res.json({ data: savedDoc, successResponse });
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Manejar errores de validación
            const validationErrors = Object.values(error.errors).map((err) => err.message);
            console.error('Errores de validación:', validationErrors);
            res.status(422).json({ success: false, message: 'Error de validación', errors: validationErrors });
        } else {
            // Manejar otros tipos de errores
            console.error(error);
            res.status(500).json({ success: false, message: 'Error interno del servidor', error: error.message });
        }
    }
};

exports.updateSingle = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;

        // Encuentra el documento por ID
        let updatedDoc = await model.findById(parseId(id));

        // Verificar si se encontró el documento antes de intentar actualizar
        if (!updatedDoc) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        // Verificar y cifrar la contraseña si se proporciona en la solicitud
        if (body.passw && body.passw !== updatedDoc.passw) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(body.passw, salt);
            updatedDoc.passw = hashedPassword;

            const LblancoContentPromise = fs.readFile('../imagenes/Lblanco.png', { encoding: 'base64' });
            const FIRMAContentPromise = fs.readFile('../imagenes/FIRMA.png', { encoding: 'base64' });

            const LblancoContent = await LblancoContentPromise;
            const FIRMAContent = await FIRMAContentPromise;

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
                            <h1>Contraseña nueva</h1>
                            <p>Estimado/a, ${body.nom}. Su nueva contraseña generada es: ${body.passw}
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

            // Función para enviar la contraseña por correo electrónico
            const sendEmail = (emaila) => {
                // Configura el transporter de nodemailer
                const transporter = nodemailer.createTransport({
                    service: 'godaddy',
                    auth: {
                        user: CORREO,
                        pass: PASS,
                    },
                });

                // Configura el mensaje del correo electrónico
                const mailOptions = {
                    from: 'datainnovation@besitz.co',
                    to: emaila,
                    subject: 'Importante: Su Nueva Contraseña',
                    html: plantilla,
                };

                // Envía el correo electrónico
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error al enviar el correo electrónico:', error);
                    } else {
                        console.log('Correo electrónico enviado:', info.response);
                    }
                });
            };
            // Envía la contraseña por correo electrónico
            sendEmail(body.emaila);     
        }

        // Actualizar otros campos solo si se proporcionan y son diferentes al valor actual
        const fieldsToUpdate = ['nom', 'ape', 'cedula', 'emaila'];
        fieldsToUpdate.forEach(field => {
            if (body.hasOwnProperty(field) && body[field] !== updatedDoc[field]) {
                updatedDoc[field] = body[field];
            }
        });

        // Guardar el documento actualizado en la base de datos
        await updatedDoc.save();

        res.json({ data: updatedDoc });

    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error al actualizar datos' });
    }
};

exports.deleteSingle = async (req, res) => {
    try {
        const { id } = req.params;

        // Encontrar el documento por ID y eliminarlo
        let deletedDoc = await model.findByIdAndDelete(parseId(id));

        // Verificar si se encontró el documento antes de intentar eliminarlo
        if (!deletedDoc) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        res.json({ data: deletedDoc });

    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error al eliminar datos' });
    }
};
