const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const votosSchema = new mongoose.Schema({
    usuarioId: { type: Schema.Types.ObjectId, ref: 'User' },
    votacionId: { type: Schema.Types.ObjectId, ref: 'Votaciones' },
    candidatoId: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Votos = mongoose.model('Votos', votosSchema);

module.exports = Votos;
