const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Besitz');

const objectbd = mongoose.connection;

objectbd.on('connect',()=>{
    console.log('Se conecto correctamente');
});

objectbd.on('error', ()=>{
    console.log('Error no conecto el servidor');
});

module.exports = mongoose;