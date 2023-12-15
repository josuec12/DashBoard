const moongose = require('mongoose')

const AdminScheme = new moongose.Schema({
            nom: {
                 required: true,
                 type: String
             },  
            
             ape: {
                 required: true,
                 type: String
             },
        
             nitt: {
                 required: true,
                 type: Number,
                 min: 9,
                 unique: true
             },
        
             passw: {
                 required: true,
                 type: String,
                 minlength: 6,
                 maxlength: 128,
                 match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\^&\*]).+/               
             },        
             emaila: {
                 required: true,
                 type: String
             }
         },
         {
            versionKey: false,
            timestamps: true
         }
       )

         module.exports = moongose.model('Admin', AdminScheme)