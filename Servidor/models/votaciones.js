const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const votacionesSchema = new mongoose.Schema({
  participantes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  candidatosM: [
    {
      candidatoId: { type: Schema.Types.ObjectId, ref: 'User' },
      votos: { type: Number, default: 0 }, // Campo para llevar un registro de los votos
    },
  ],
  candidatosF: [
    {
      candidatoId: { type: Schema.Types.ObjectId, ref: 'User' },
      votos: { type: Number, default: 0 }, // Campo para llevar un registro de los votos
    },
  ],
  estado: Boolean,
  tipo: Number,
});

const Votaciones = mongoose.model('Votaciones', votacionesSchema);

module.exports = Votaciones;
