const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const votacionesSchema = new mongoose.Schema({
  participantes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  candidatos: [{type: Schema.Types.ObjectId, ref: 'User'}],
  estado: Boolean,
  tipo: Number,
});

const Votaciones = mongoose.model('Votaciones', votacionesSchema);

module.exports = Votaciones;
