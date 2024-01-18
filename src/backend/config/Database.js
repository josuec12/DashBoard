const mongoose = require('mongoose');
require('dotenv').config();
const URL = process.env.URL;
module.exports = () => {
    const connect = () => {
        mongoose.connect(
            URL
        );

        mongoose.connection.on('connected', () => {
            console.log("Conexión exitosa a la Base de Datos");
        });

        mongoose.connection.on('error', (err) => {
            console.error("Error al conectar a la base de datos:", err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log("Desconectado de la Base de Datos");
        });

        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                console.log("Conexión cerrada debido a la terminación de la aplicación");
                process.exit(0);
            });
        });
    };

    connect();
};
