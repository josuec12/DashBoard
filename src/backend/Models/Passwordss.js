const mongoose = require('mongoose');

const PasswordResetRequestSchema = new mongoose.Schema({
  // email: { type: String, required: true },
  name: {type: String},
  lastName: {type: String},
  fecha: { type: Date, default: Date.now },
  estado: { type: String, enum: ['pendiente', 'aprobado', 'rechazado'], default: 'pendiente' },
});

module.exports = mongoose.model('Password', PasswordResetRequestSchema);
