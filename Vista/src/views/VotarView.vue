<template>
  <div>
    <div v-if="votaciones.length > 0">
      <v-card v-for="(votacion,index) in votaciones" :key="votacion._id">
        <v-card-title>Votación {{ index +1}}</v-card-title>
        <v-card-text>
          <!-- Agrega más campos de votación según tu modelo -->
          <h2>Hombres:</h2>
          <v-radio-group v-model="votacion.participanteSeleccionadoM">
            <v-radio v-for="hombre in votacion.candidatosM" :key="hombre.candidatoId._id" :label="hombre.candidatoId.nombre" :value="hombre.candidatoId._id"></v-radio>
          </v-radio-group>
          <h2>Mujeres</h2>
          <v-radio-group v-model="votacion.participanteSeleccionadoF">
            <v-radio v-for="mujer in votacion.candidatosF" :key="mujer.candidatoId._id" :label="mujer.candidatoId.nombre" :value="mujer.candidatoId._id"></v-radio>
          </v-radio-group>
        </v-card-text>
        
        <v-card-actions>
          <v-btn @click="votar(votacion)" :disabled="!votacion.participanteSeleccionadoM && !votacion.participanteSeleccionadoF" >Votar</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-else>
      <p>No hay votaciones disponibles.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "VotarView",
  data() {
    return {
      votaciones: [],
    };
  },
  created() {
    this.obtenerVotos();
  },
  methods: {
    async obtenerVotaciones() {
      const usuario = this.$store.state.usuario;
      let url = 'http://localhost:3030/votaciones';
      if (usuario.tipo === 1) {
        url += '/getVotacionesAlumnos/' + usuario._id;
      } else if (usuario.tipo === 2) {
        url += '/getVotacionesProfesores/' + usuario._id;
      } else {
        url += '/getVotaciones';
      }
      
      try {
        const response = await axios.get(url);
        this.votaciones = response.data.votaciones;
      } catch (error) {
        console.error(error);
      }
    },
    async obtenerVotos() {
      await this.obtenerVotaciones();
      const usuario = this.$store.state.usuario;
      try {
        const response = await axios.get('http://localhost:3030/votos/getVotosUsuario/' + usuario._id);
        console.log(this.votaciones);
        this.votos = response.data.votos;
        const idVotaciones = this.votos.map((voto) => voto.votacionId);
        this.votaciones = this.votaciones.filter((votacion) => !idVotaciones.includes(votacion._id));
        console.log(idVotaciones);
      } catch (error) {
        console.error(error);
      }
    },
    votar(votacion) {
      console.log(votacion);
      if (votacion.participanteSeleccionadoM && votacion.participanteSeleccionadoF) {
        // Implementa la lógica para enviar el voto con el participante seleccionado
        const nuevoVoto = {
          usuarioId: this.$store.state.usuario._id ,
          votacionId : votacion._id,
          candidatoIdF: votacion.participanteSeleccionadoF,
          candidatoIdM: votacion.participanteSeleccionadoM,
        };
        axios.post('http://localhost:3030/votos/postVoto', nuevoVoto)
          .then((response) => {
            console.log(response);
            this.obtenerVotos();
          })
          .catch((error) => {
            console.error(error);
          });
          
      } else {
        alert('Selecciona los dos participantes');
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
