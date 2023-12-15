const mongoose  = require('mongoose');
const model = require('../Models/Adminss');
const bcrypt = require('bcrypt')

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
        const { nom, ape, nitt, passw, emaila } = req.body;

        const data = req.body;

        // Verificar si ya existe un documento con el mismo nit
        const existingDoc = await model.findOne({ nitt: data.nitt });

        if (existingDoc) {
            // El documento ya existe, decide qué hacer en este caso
            return res.status(409).json({ error: 'El nit ya existe.' });
        }

        // Crear una nueva instancia del modelo con los datos del cuerpo de la solicitud
        const newDoc = new model({
            nom,
            ape,
            nitt,
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

        // Encontrar el documento por ID y actualizarlo, estableciendo 'new' en true para obtener el documento actualizado
        let updatedDoc = await model.findByIdAndUpdate(
            parseId(id),
            { $set: body },
            { new: true }
        );

        // Verificar si se encontró el documento antes de intentar actualizar
        if (!updatedDoc) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        // Verificar si el campo 'passw' está presente en el cuerpo de la solicitud antes de intentar cifrarlo
        if (body.passw) {
            // Encriptar la contraseña antes de guardarla en la base de datos
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(body.passw, salt);

            // Actualizar el campo 'passw' en el documento actualizado con la contraseña cifrada
            updatedDoc.passw = hashedPassword;
            
            // Guardar el documento actualizado con la contraseña cifrada
            await updatedDoc.save();
        }

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

// exports.getAll = async (req, res) => {
//     try {
//         // Obtener todos los documentos del modelo
//         let allDocs = await model.find();

//         res.json({ data: allDocs });

//     } catch (err) {
//         console.error(err);
//         res.status(500).send({ error: 'Error al obtener datos' });
//     }
// };

exports.getSingle = async (req, res) => {
    try {
        const { id } = req.params;

        // Encontrar el documento por ID
        let foundDoc = await model.findById(parseId(id));

        // Verificar si se encontró el documento
        if (!foundDoc) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        res.json({ data: foundDoc });

    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error al obtener datos' });
    }
};
