<template>
  <div>
    <h1>Detener Votaciones</h1>
    <v-alert v-if="alerta.visible" :type="alerta.tipo" dismissible @input="alerta.visible = false">
      {{ alerta.mensaje }}
    </v-alert>
    <v-card v-for="(votacion, index) in votaciones" :key="votacion._id" class="mb-3">
      <v-card-title>Votación {{ index + 1 }}</v-card-title>
      <v-card-text>
        <p>Estado: {{ votacion.estado ? 'Activo' : 'Inactivo' }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="cambiarEstado(votacion)" color="primary">
          Cambiar Estado
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DetenerVotacionView",
  created() {
    this.obtenerVotaciones();
  },
  data() {
    return {
      votaciones: [],
      alerta: {
        visible: false,
        tipo: "",
        mensaje: "",
      },
    };
  },
  props: {},
  methods: {
    async obtenerVotaciones() {
      try {
        const response = await axios.get("http://localhost:3000/votaciones/getVotaciones");
        this.votaciones = response.data.votaciones;
      } catch (error) {
        console.error(error);
      }
    },
    async cambiarEstado(votacion) {
      votacion.estado = !votacion.estado; // Cambiar el estado
      try {
        await axios.put(`http://localhost:3000/votaciones/updateVotacion/${votacion._id}`, {
          estado: votacion.estado,
          participantes: votacion.participantes,
          candidatos: votacion.candidatos,
        }).then( () => {
          this.mostrarAlerta("success", "Estado cambiado con éxito.");
        })
      } catch (error) {
        console.error(error);
        this.mostrarAlerta("error", "Hubo un error al cambiar el estado.");
      }
    },
    mostrarAlerta(tipo, mensaje) {
      this.alerta.tipo = tipo;
      this.alerta.mensaje = mensaje;
      this.alerta.visible = true;
      setTimeout(() => {
        this.alerta.visible = false;
      }, 3000); // Ocultar la alerta después de 3 segundos
    },
  },
};
</script>

