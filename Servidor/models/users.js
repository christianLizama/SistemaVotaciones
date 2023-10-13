const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  rut: String,
  nombre: String,
  apellido: String,
  genero: String,
  correo: String,
  clave: String,
  tipo: Number,
  voto: Number,
  conteoVotos: Number,
  votoPorM: Number,
  votoPorF: Number,
  invitado: Number,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
