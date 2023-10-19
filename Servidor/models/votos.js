const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const votosSchema = new mongoose.Schema({
    usuarioId: { type: Schema.Types.ObjectId, ref: 'User' },
    votacionId: { type: Schema.Types.ObjectId, ref: 'Votaciones' },
    candidatoIdF: { type: Schema.Types.ObjectId, ref: 'User' },
    candidatoIdM: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Votos = mongoose.model('Votos', votosSchema);

module.exports = Votos;
