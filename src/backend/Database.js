const mongoose = require('mongoose')
const Contraseña = require('./Contraseña.js')

const connectionString = `mongodb+srv://Besitz:${Contraseña}@atlascluster.wddfkwf.mongodb.net/Besitz?retryWrites=true&w=majority`

mongoose.connect(connectionString)
.then(() => {
    console.log('Database connected')
}).catch(err =>{
    console.error(err)
})

const registroSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },  
    
    apellido: {
        required: true,
        type: String
    },

    nit: {
        required: true,
        type: Number,
        min: 9
    },

    pass: {
        required: true,
        type: String,
        bcrypt: true
    },

    email: {
        required: true,
        type: String
    },

    boletin: {
        required: true,
        type: File
    },

    ventas: {
        required: true,
        type: String
    },

    financiero: {
        required: true,
        type: String
    }
   
})

// registroSchema.plugin(require('mongoose-bcrypt'))
const Registro = mongoose.model('Registro', registroSchema)
