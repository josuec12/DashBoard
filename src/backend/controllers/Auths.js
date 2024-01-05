const modelU = require('../Models/Besitzss');
const modelA = require('../Models/Adminss');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const findUser = (nit) => {
    return modelU.findOne({ nit });
};

const findAdmin = (cedula) => {
    return modelA.findOne({ cedula });
};

const comparePasswords = (password, hashedPassword) => {
    return new Promise((resolve, reject) => {
        if (password && hashedPassword) {
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        } else {
            reject(new Error('Falta la contraseña o la contraseña hash.'));
        }
    });
};

const generateTokenU = (Besitz) => {
    const expiration = Math.floor(Date.now() / 1000) + 60 * 10;
    return jwt.sign(
        {
            data: {
                _id: Besitz._id
            },
            exp: expiration
        },
        'llave-secreta-123'
    );
};

const generateTokenA = (Admin) => {
    const expiration = Math.floor(Date.now() / 1000) + 60 * 10;
    return jwt.sign(
        {
            data: {
                _id: Admin
            },
            exp: expiration
        },
        'llave-secreta-123'
    );
};

exports.loginU = async (req, res) => {
    const body = req.body;

    try {
        const Besitz = await findUser(body.nit);

        if (!Besitz) {
            res.send({ success: false, data: 'Usuario no encontrado' });
            return;
        }

        const result = await comparePasswords(body.pass, Besitz.pass);

        if (result) {
            const token = generateTokenU(Besitz);

            console.log('Token enviado al cliente:', token);
            res.send({ success: true, data: { Besitz }, token: token });
        } else {
            res.send({ success: false, data: 'Contraseña incorrecta.' });
        }
    } catch (error) {
        console.error('Error en loginU:', error);
        res.status(500).send({ success: false, error: 'Error interno del servidor en loginU' });
    }
};

exports.loginA = async (req, res) => {
    const body = req.body;

    try {
        const Admin = await findAdmin(body.cedula);

        if (!Admin) {
            res.send({ success: false, data: 'Administrador no encontrado' });
            return;
        }

        const result = await comparePasswords(body.passw, Admin.passw);

        if (result) {
            const token = generateTokenA(Admin);

            res.send({ success: true, data: { Admin}, token: token });
        } else {
            res.send({ success: false, data: 'Contraseña incorrecta.' });
        }
    } catch (error) {
        console.error('Error en loginA:', error);
        res.status(500).send({ success: false, error: 'Error interno del servidor en loginA' });
    }
};





