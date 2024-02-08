const mongoose = require('mongoose');
const model = require('../Models/Besitzss');
const bcrypt = require('bcrypt')
const fs = require('fs').promises;
const path = require('path');
const nodemailer = require('nodemailer');
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
        const { nombre, apellido, nit, email, ventas, financiero } = req.body;
        const data = req.body;

        // Verificar si ya existe un documento con el mismo nit
        const existingDoc = await model.findOne({ nit: data.nit });

        console.log("Existing Doc:", existingDoc);

        if (existingDoc) {
            console.log("Documento existente. No se procesarán archivos.");
            return res.status(409).send({ error: 'El nit ya existe.' });
        }

        console.log("Continuando con el procesamiento de archivos.");

        // Accede a las rutas de los archivos desde req.files
        const { boletin, logo } = req.files;
        const boletinPath = boletin[0].path;
        const logoPath = logo[0].path;

        // Encriptar la contraseña antes de guardarla en la base de datos
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.pass, salt);

        // Crear una nueva instancia del modelo con los datos del cuerpo de la solicitud
        const newDoc = new model({
            nombre,
            apellido,
            nit,
            pass: hashedPassword,
            email,
            ventas,
            financiero,
            boletin: boletinPath, // Utiliza la ruta del archivo
            logo: logoPath // Utiliza la ruta del archivo
        });

        // Sobreescribir la contraseña en el nuevo documento con la versión encriptada
        // newDoc.pass = hashedPassword;

        // Guardar el nuevo documento en la base de datos
        const savedDoc = await newDoc.save();

        // Responder con el documento guardado
        res.json({ data: savedDoc, successResponse });


    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error al insertar datos' });
    }
};


exports.updateSingle = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const { boletin, logo } = req.files;

        // Encuentra el documento por ID
        let updatedDoc = await model.findById(parseId(id));

        // Verificar si se encontró el documento antes de intentar actualizar
        if (!updatedDoc) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        // Verificar y cifrar la contraseña si se proporciona en la solicitud
        if (body.pass && body.pass !== updatedDoc.pass) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(body.pass, salt);
            updatedDoc.pass = hashedPassword;

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
                            <img src="cid:Lblanco" alt="" style="width: 140px; height: 180px;">
                        </div>
                        <!-- Imagen inicial -->
            
                        <!-- Contenido principal -->
                        <div style="background-color: #ffffff; padding: 10px 0px 0px 0px; width: 100%; text-align: center;">
                            <h1>Contraseña nueva</h1>
                            <p>La contraseña generada es: ${body.pass}
                            </p>
            
                            <img src="cid:FIRMA" alt="" style="width: 430px; height: 200px;">
                        
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
            const sendEmail = (email) => {
                // Configura el transporter de nodemailer
                const transporter = nodemailer.createTransport({
                    service: 'godaddy',
                    auth: {
                        user: CORREO, // Cambia esto por tu dirección de correo electrónico
                        pass: PASS, // Cambia esto por tu contraseña de correo electrónico
                    },
                });

                // Configura el mensaje del correo electrónico
                const mailOptions = {
                    from: 'datainnovation@besitz.co',
                    to: email,
                    subject: 'Importante: Su Nueva Contraseña',
                    html: plantilla,
                    attachments: [{
                        filename: 'FIRMA.png', // nombre del archivo adjunto
                        path: path.join(__dirname, '../', '..', 'imagenes', 'FIRMA.png'), // ruta de la imagen
                        cid: 'FIRMA', // identificador de contenido
                    },
                    {
                        filename: 'Lblanco.png', // nombre del archivo adjunto
                        path: path.join(__dirname, '..', '..', 'imagenes', 'Lblanco.png'), // ruta de la imagen
                        cid: 'Lblanco', // identificador de contenido
                    }]
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
            sendEmail(body.email);
        }

        

        // Actualizar otros campos
        ['nombre', 'apellido', 'nit', 'email', 'ventas', 'financiero'].forEach(field => {
            if (body[field]) {
                updatedDoc[field] = body[field];
            }
        });

        // Actualizar rutas de archivos
        const updateFilePath = async (file, property) => {
            if (file) {
                await fs.unlink(updatedDoc[property]);
                updatedDoc[property] = file[0].path;
            }
        };

        await updateFilePath(boletin, 'boletin');
        await updateFilePath(logo, 'logo');

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

        // Encontrar el documento por ID para obtener información del usuario
        const userToDelete = await model.findById(parseId(id));

        // Verificar si se encontró el documento antes de intentar eliminarlo
        if (!userToDelete) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        // Obtener la información del usuario, incluyendo los archivos
        const { boletin, logo } = userToDelete;

        // Definir la ruta de la carpeta donde se almacenan los archivos
        const filesFolder = '';

        // Eliminar el archivo boletin
        await deleteFile(filesFolder, boletin);

        // Eliminar el archivo logo
        await deleteFile(filesFolder, logo);

        // Ahora que los archivos están eliminados, podemos borrar el usuario
        const deletedDoc = await model.findByIdAndDelete(parseId(id));

        res.json({ data: deletedDoc });

    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error al eliminar datos' });
    }
};

// Función para eliminar un archivo específico
async function deleteFile(filesFolder, fileName) {
    if (fileName) {
        const filePath = path.join(__dirname, '..', filesFolder, fileName);
        console.log('Ruta del archivo a eliminar:', filePath);
        try {
            await fs.unlink(filePath);
        } catch (error) {
            console.error(`Error al eliminar el archivo ${fileName}: ${error.message}`);
        }
    }
}

