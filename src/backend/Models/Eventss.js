const mongoose = require('mongoose');

const EventsCalSchema = new mongoose.Schema({
    cliente:{
        type: String,
        required: true
    },
    nit:{
        type: Number,
        required: true,
    },
    name: { 
        type: String, 
        required: true
    },
    dateTime: {
        type: [Date],
        required: true
    },
    email: {
        required: true,
        type: String
    },
    emailSent: {
        type: Boolean,
        default: false 
    }

});

const EventCal = mongoose.model("EventCal", EventsCalSchema);

module.exports = EventCal;