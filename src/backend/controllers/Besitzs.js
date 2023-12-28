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
