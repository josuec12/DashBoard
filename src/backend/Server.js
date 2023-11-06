const express = require('express')
const app = express()


const archivoDB = require('./Connection')
app.get('/',(req,res)=>{
    res.end('Bienvenido al servidor backend')
})

//Confi el server
app.listen(5000, function(){
    console.log('El servidor esta corriendo correctamente')
})