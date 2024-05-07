const PasswordResetRequest = require('../Models/Passwordss');
const mongoose = require('mongoose');
const model = require('../Models/Besitzss');
const modelA = require('../Models/Adminss');

const parseId = (id) => {
    return new mongoose.Types.ObjectId(id);
};

exports.getData = async (req, res) => {
    try {
        const docs = await PasswordResetRequest.find({});
        res.send({ docs });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error al obtener datos' });
    }
};

exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    const { emaila } = req.body;

    try {

        // Verificar si el correo electrónico está registrado
        const user = await model.findOne({ email });
        const admin = await modelA.findOne({ emaila });
        let name = '';
        let lastName = '';


        if (user) {
            name = user.nombre;
            lastName = user.apellido; // Suponiendo que el nombre del usuario se almacena en el campo 'nombre' del modelo 'model'
        } else if (admin) {
            name = admin.nom;
            lastName = admin.ape; // Suponiendo que el nombre del administrador se almacena en el campo 'nombre' del modelo 'modelA'
        } else {
            return res.status(404).json({ error: 'El correo electrónico no está registrado.' });
        }

        // Verificar si el correo electrónico ya tiene una solicitud pendiente
        const existingRequest = await PasswordResetRequest.findOne({ email, estado: 'pendiente' });
        const existingRequestA = await PasswordResetRequest.findOne({ emaila, estado: 'pendiente' });


        if (existingRequest  && existingRequestA) {
            return res.status(409).json({ error: 'Ya hay una solicitud pendiente para este correo electrónico.' });
        }

        // Crear una nueva solicitud de restablecimiento de contraseña con ubicación
        await PasswordResetRequest.create({ name, lastName});

        res.json({ message: 'Solicitud de restablecimiento de contraseña enviada correctamente.' });
    } catch (error) {
        console.error('Error al procesar la solicitud de restablecimiento de contraseña:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// Elimina una solicitud de restablecimiento de contraseña por su ID
exports.deletePasswordReset = async (req, res) => {
    const { id } = req.params;

    try {
        const request = await PasswordResetRequest.findByIdAndDelete(id);

        if (!request) {
            return res.status(404).json({ error: 'No se encontró la solicitud.' });
        }

        res.json({ message: 'La solicitud fue eliminada exitosamente.' });
    } catch (error) {
        console.log("Error al borrar la solicitud de restablecimiento de contraseña", error);
        res.status(500).json({ error: "Error interno del servidor." })
    }
}

exports.updateSingle = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;

        // Encontrar el documento por ID y actualizarlo, estableciendo 'new' en true para obtener el documento actualizado
        let updatedDoc = await PasswordResetRequest.findByIdAndUpdate(
            parseId(id),
            { $set: body },
            { new: true }
        );

        // Verificar si se encontró el documento antes de intentar actualizar
        if (!updatedDoc) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        } 
            
            await updatedDoc.save();      

        res.json({ data: updatedDoc });

    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error al actualizar datos' });
    }
};