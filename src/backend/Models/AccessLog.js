const mongoose = require('mongoose');

const accessLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Referencia al modelo de usuario si es necesario
        required: true
    },
    userNom: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['Admin', 'User'], 
        required: true
    },
    tiempo: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        require: true
    },
    lng: {
        type: String,
        require: true
    },
    userAgent: {
        type: String,
        required: true
    },
    hostname: {
        type: String, 
        required: true
    }
});

const AccessLog = mongoose.model('AccessLog', accessLogSchema);

module.exports = AccessLog;
