const modelU = require('../Models/Besitzss');
const modelA = require('../Models/Adminss');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AccessLog = require('../Models/AccessLog');
const os = require('os');
const obtenerUbicacion = require('geoip-lite');
const UAParser = require('ua-parser-js');
const moment = require('moment-timezone')
require('dotenv').config();


 const KEY = process.env.KEY_SECRET;

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
    const expiration = Math.floor(Date.now() / 1000) + 60 * 100;
    return jwt.sign(
        {
            data: {
                Besitz
            },
            exp: expiration
        },
        KEY
    );
};

const generateTokenA = (Admin) => {
    const expiration = Math.floor(Date.now() / 1000) + 60 * 100;
    return jwt.sign(
        {
            data: {
                Admin
            },
            exp: expiration
        },
        KEY
    );
};

exports.getData = async (req, res) => {
    try {
        const docs = await AccessLog.find({});
        res.send({ docs });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Error al obtener datos' });
    }
};

function getUserBrowserInfo(userAgent) {
    const parser = new UAParser();
    const parsedResult = parser.setUA(userAgent).getResult();

    const browserName = parsedResult.browser.name || 'Desconocido';

    return {
        name: browserName,
    };
}


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
            res.send({ success: true, data: { Besitz }, token: token });

            const hostnamee = os.hostname();

            const ipU = '190.242.100.114';
            const locationU = obtenerUbicacion.lookup(ipU);
            const latitud = locationU.ll[0];
            const longitud = locationU.ll[1];
          
            const timeZoneLocationU = moment.tz.guess(locationU.city);
            const timeZoneU = moment().tz(timeZoneLocationU);
            const horaZonaHorariaU = timeZoneU.format('DD/MM/YYYY-HH:mm:ss');

            const userAgentt =  req.headers['user-agent'];
            const explorador = getUserBrowserInfo(userAgentt);

            // Registrar acceso
            const accessLogEntry = new AccessLog({
                userId: Besitz._id,
                userNom: Besitz.nombre,
                userType: 'User',
                tiempo: horaZonaHorariaU,
                ipAddress: locationU ? `${locationU.city},${locationU.country}`: 'Desconocido',
                lat: latitud,
                lng: longitud, 
                userAgent: explorador.name,
                hostname: hostnamee
            });
            await accessLogEntry.save();
            
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
            const tokenA = generateTokenA(Admin);
            res.send({ success: true, data: { Admin }, tokenA: tokenA });

            const hostnamee = os.hostname();

            const ip = '91.160.93.4'; // IP fija para prueba --- req.ip para ip dinamica
            const location = obtenerUbicacion.lookup(ip);
            const latitud = location.ll[0];
            const longitud = location.ll[1];
            const timeZoneLocation = moment.tz.guess(location.city);
            const timeZone = moment().tz(timeZoneLocation);
            const horaZonaHoraria = timeZone.format('DD/MM/YYYY-HH:mm:ss');

            const userAgentt =  req.headers['user-agent'];
            const explorador = getUserBrowserInfo(userAgentt);

            const accessLogEntry = new AccessLog({
                userId: Admin._id,
                userNom: Admin.nom,
                userType: 'Admin',
                tiempo: horaZonaHoraria,
                ipAddress: location ? `${location.city},${location.country}`: 'Desconocido',
                lat: latitud,
                lng: longitud, 
                userAgent: explorador.name,
                hostname: hostnamee
            });
            await accessLogEntry.save();

        } else {
            res.send({ success: false, data: 'Contraseña incorrecta.' });
        }
    } catch (error) {
        console.error('Error en loginA:', error);
        res.status(500).send({ success: false, error: 'Error interno del servidor en loginA' });
    }
};

