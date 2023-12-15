const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const Database = require('./config/Database');
const AdminRouters = require('./routes/Admin');
const BesitzRouters = require('./routes/Besitz');
const AuthRouters = require('./routes/Auth')
const port = 5000;

const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200, // Algunos navegadores antiguos (IE11) interpretan mal las respuestas con un código 204
  };

  app.use(cors(corsOptions));

// Manejar solicitudes OPTIONS para cualquier ruta
app.options('*', cors(corsOptions));


// Middleware
app.use(express.json()); // Permite el análisis de solicitudes con formato JSON
app.use(BesitzRouters);
app.use(AdminRouters);
app.use(AuthRouters)

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




