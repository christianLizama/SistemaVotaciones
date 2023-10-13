const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const votacionesSchema = new mongoose.Schema({
  idParticipantes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  idCandidatos: [{type: Schema.Types.ObjectId, ref: 'User'}],
  estado: Boolean
});

const Votaciones = mongoose.model('Votaciones', votacionesSchema);

module.exports = Votaciones;
