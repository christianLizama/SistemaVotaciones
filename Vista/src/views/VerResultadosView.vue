<template>
    <div>
      <!-- Itera a través de las votaciones y muestra cada una en una tarjeta -->
      <v-card
        v-for="(votacion, index) in votaciones"
        :key="votacion._id"
        class="mb-3"
      >
        <v-card-title> Votación {{ index + 1 }} </v-card-title>
        <v-card-text>
          <h3>Candidatos:</h3>
          <ul>
            <h4>Hombres:</h4>
            <li
              v-for="hombre in votacion.candidatosM"
              :key="hombre.candidatoId._id"
            >
              {{ hombre.candidatoId.nombre }} {{ hombre.candidatoId.apellido }} 
              <strong> - Votos:</strong> {{ hombre.votos }}
            </li>
            <h4>Mujeres:</h4>
            <li
              v-for="mujer in votacion.candidatosF"
              :key="mujer.candidatoId._id"
            >
              {{ mujer.candidatoId.nombre }} {{ mujer.candidatoId.apellido }} 
              <strong> - Votos:</strong> {{ mujer.votos }}
            </li>
          </ul>
          <h3>Participantes:</h3>
          <ul>
            <li
              v-for="participante in votacion.participantes"
              :key="participante._id"
            >
              {{ participante.nombre }}
            </li>
          </ul>
          <h3>Estado:</h3>
          <li>{{ votacion.estado ? "Activa" : "Terminada" }}</li>
          <h3 v-if="!votacion.estado">Ganadores:</h3>
          <ul v-if="!votacion.estado">
            <h4>Hombres:</h4>
            <li v-for="ganador in votacion.ganadores.ganadoresM" :key="ganador.candidatoId._id">
              {{ ganador.candidatoId.nombre }} {{ ganador.candidatoId.apellido }} - Votos: {{ ganador.votos }}
            </li>
            <h4>Mujeres:</h4>
            <li v-for="ganador in votacion.ganadores.ganadoresF" :key="ganador.candidatoId._id">
              {{ ganador.candidatoId.nombre }} {{ ganador.candidatoId.apellido }} - Votos: {{ ganador.votos }}
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "CrearVotacionView",
    created() {
      this.obtenerVotaciones();
    },
    data() {
      return {
        votaciones: [],
        alumnosM: [],
        alumnosF: [],
        profesoresM: [],
        profesoresF: [],
      };
    },
    methods: {
      async obtenerVotaciones() {
        try {
          const usuario = this.$store.state.usuario;
          let response;
  
          if (usuario.tipo === 1) {
            response = await axios.get(
              "http://localhost:3030/votaciones/getVotacionesAlumnos/" +
                usuario._id
            );
          } else if (usuario.tipo === 2) {
            response = await axios.get(
              "http://localhost:3030/votaciones/getVotacionesProfesores/" +
                usuario._id
            );
          } else {
            response = await axios.get("http://localhost:3030/votaciones/getVotaciones");
          }
  
          // Calcular los ganadores para cada votación
          this.votaciones = response.data.votaciones.map((votacion) => {
            if (!votacion.estado) {
              votacion.ganadores = this.calcularGanadores(votacion);
            }
            return votacion;
          });
  
          console.log(this.votaciones);
        } catch (error) {
          console.error(error);
        }
      },
      calcularGanadores(votacion) {
        const candidatosM = votacion.candidatosM;
        const candidatosF = votacion.candidatosF;
  
        const maxVotosM = Math.max(...candidatosM.map((candidato) => candidato.votos));
        const ganadoresM = candidatosM.filter((candidato) => candidato.votos === maxVotosM);
  
        const maxVotosF = Math.max(...candidatosF.map((candidato) => candidato.votos));
        const ganadoresF = candidatosF.filter((candidato) => candidato.votos === maxVotosF);
  
        return { ganadoresM, ganadoresF };
      },
    },
  };
  </script>
  