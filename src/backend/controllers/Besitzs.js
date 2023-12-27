const mongoose  = require('mongoose');
const model = require('../Models/Besitzss');
const bcrypt = require('bcrypt')
const fs = require('fs').promises;


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
        const { nombre, apellido, nit, pass, email, ventas, financiero } = req.body;
        const data = req.body;

        // Verificar si ya existe un documento con el mismo nit
        const existingDoc = await model.findOne({ nit: data.nit });

        if (existingDoc) {
            // El documento ya existe, decide qué hacer en este caso
            res.status(409).send({ error: 'El nit ya existe.' });
            return;
        }

        // Accede a las rutas de los archivos desde req.files
        const { boletin, logo } = req.files;
        const boletinPath = boletin[0].path;
        const logoPath = logo[0].path;

        // Crear una nueva instancia del modelo con los datos del cuerpo de la solicitud
        const newDoc = new model({
            nombre,
            apellido,
            nit,
            pass,
            email,
            ventas,
            financiero,
            boletin: boletinPath, // Utiliza la ruta del archivo
            logo: logoPath // Utiliza la ruta del archivo
        });

        // Encriptar la contraseña antes de guardarla en la base de datos
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.pass, salt);

        // Sobreescribir la contraseña en el nuevo documento con la versión encriptada
        newDoc.pass = hashedPassword;

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

        // Encontrar el documento por ID
        let existingDoc = await model.findById(parseId(id));

        // Verificar si se encontró el documento antes de intentar actualizar
        if (!existingDoc) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        // Accede a las rutas de los archivos desde req.files
        const { boletin, logo } = req.files;
        // const boletinPath = boletin[0].path;
        // const logoPath = logo[0].path;

        // Si hay un nuevo boletín, actualiza la ruta del boletín en el documento existente
        if (boletin) {
            // Eliminar el archivo anterior si existe
            await fs.unlink(existingDoc.boletin);
            // Obtener la nueva ruta del boletín
            const boletinPath = boletin[0].path;
            // Actualizar la ruta del boletín en el documento existente
            existingDoc.boletin = boletinPath;
        }

        // Si hay un nuevo logo, actualiza la ruta del logo en el documento existente
        if (logo) {
            // Eliminar el archivo anterior si existe
            await fs.unlink(existingDoc.logo);
            // Obtener la nueva ruta del logo
            const logoPath = logo[0].path;
            // Actualizar la ruta del logo en el documento existente
            existingDoc.logo = logoPath;
        }

        // Actualizar otros campos del documento
        existingDoc.nombre = body.nombre || existingDoc.nombre;
        existingDoc.apellido = body.apellido || existingDoc.apellido;
        existingDoc.email = body.email || existingDoc.email;
        existingDoc.ventas = body.ventas || existingDoc.ventas;
        existingDoc.financiero = body.financiero || existingDoc.financiero;

        // Verificar si el campo 'pass' está presente en el cuerpo de la solicitud antes de intentar cifrarlo
        if (body.pass) {
            // Encriptar la contraseña antes de guardarla en la base de datos
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(body.pass, salt);

            // Actualizar el campo 'pass' en el documento existente con la contraseña cifrada
            existingDoc.pass = hashedPassword;
        }

        // Guardar el documento actualizado en la base de datos
        const updatedDoc = await existingDoc.save();

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
