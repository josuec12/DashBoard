const PasswordResetRequest = require('../Models/Passwordss');
const model = require('../Models/Besitzss');

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

    try {

        // Verificar si el correo electrónico está registrado
        const user = await model.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'El correo electrónico no está registrado.' });
        }

        // Verificar si el correo electrónico ya tiene una solicitud pendiente
        const existingRequest = await PasswordResetRequest.findOne({ email, estado: 'pendiente' });

        if (existingRequest) {
            return res.status(409).json({ error: 'Ya hay una solicitud pendiente para este correo electrónico.' });
        }

        // Crear una nueva solicitud de restablecimiento de contraseña con ubicación
        await PasswordResetRequest.create({ email });

        res.json({ message: 'Solicitud de restablecimiento de contraseña enviada correctamente.' });
    } catch (error) {
        console.error('Error al procesar la solicitud de restablecimiento de contraseña:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};