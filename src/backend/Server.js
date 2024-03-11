const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const Database = require('./config/Database');
const AdminRouters = require('./routes/Admin');
const BesitzRouters = require('./routes/Besitz');
const AuthRouters = require('./routes/Auth')
const PasswordRouters = require('./routes/Password')
require('dotenv').config();

const port = process.env.PORT;
const front = process.env.FRONT;

const corsOptions = {
    origin: front, 
    optionsSuccessStatus: 200, 
  };

  app.use(cors(corsOptions));

// Manejar solicitudes OPTIONS para cualquier ruta
app.options('*', cors(corsOptions));


// Middleware
app.use(express.json()); // Permite el análisis de solicitudes con formato JSON
app.use(BesitzRouters);
app.use(AdminRouters);
app.use(AuthRouters)
app.use(PasswordRouters)

app.use(
    bodyParser.json({   
        limit: '20mb'
    })
)

app.use(
    bodyParser.urlencoded({
        limit:'20mb',
        extended: true 
    })
)

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});



// Conexión a la base de datos
Database();

// Iniciar el servidor
app.listen(port, () => {
    console.log('La app está en línea en el puerto', port);
});




