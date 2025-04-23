const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  razon_social: { type: String, required: true, unique: true }, 
  rut: String,                       
  capital: String,
  objeto: String,
  socios: [String],
  tipo_evento: String,
  archivo: String
});

module.exports = mongoose.model('Company', companySchema);
