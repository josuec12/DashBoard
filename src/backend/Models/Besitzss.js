const moongose = require('mongoose')

const BesitzScheme = new moongose.Schema({
    nombre: {
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
        min: 9,
        unique: true
    },

    pass: {
        required: true,
        type: String,
        minlength: 6,
        maxlength: 128,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\^&\*]).+/
    },

    email: {
        required: true,
        type: String
    },

    boletin: {
        required: true,
        type: String
    },

    ventas: {
        required: true,
        type: String
    },

    financiero: {
        required: true,
        type: String
    },
    logo: {
        type: String,
        required: true
    }
},
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = moongose.model('Besitz', BesitzScheme)