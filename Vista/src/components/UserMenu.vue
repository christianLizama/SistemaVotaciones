<template>
  <div>
    <p>Hola desde UserMenu</p>
    <v-list>
      <v-list-item v-for="entry in participatedEntries" :key="entry.id">
        <v-list-item-title>{{ entry.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "UserMenuComponente",
  data() {
    return {
      participatedEntries: [], // Almacenar las entradas en las que participa el usuario
    };
  },
  created() {
    // Llamar a un método para cargar las entradas en las que participa el usuario
    this.loadParticipatedEntries();
  },
  methods: {
    loadParticipatedEntries() {
      // Realizar una solicitud HTTP para obtener las entradas en las que participa el usuario
      // Por ejemplo, usando Axios
      axios.get('/') // Cambia la URL a tu endpoint
        .then((response) => {
          this.participatedEntries = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
</style>
