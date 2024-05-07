const mongoose = require('mongoose');

const NameEventSchema = new  mongoose.Schema({
    name: { 
        type : String, 
        required: true
    },
    dateTime: [{
        type: Date,
        required: true,
        // Define una función para eliminar la hora de la fecha
        get: function(value) {
          return value.toISOString().split('T')[0]; // Retorna solo la fecha sin la hora
        }
      }]
})

const NameEvent = mongoose.model("NameEvent", NameEventSchema);

module.exports = NameEvent;