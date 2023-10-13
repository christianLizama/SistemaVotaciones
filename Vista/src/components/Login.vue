<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm6 md4>
        <v-card class="elevate dark">
          <v-card-title class="headline text-center primary--text">Inicio de Sesión</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="correo"
                label="Correo electrónico"
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="clave"
                label="Contraseña"
                type="password"
                outlined
                dense
              ></v-text-field>
              <v-btn color="primary" type="submit" block large>Iniciar Sesión</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import router from '@/router';

export default {
  name: "LoginComponent",
  data() {
    return {
      correo: '',
      clave: '',
    };
  },
  methods: {
    login() {
      router.push("adminMenu")
    },
  },
};
</script>

<style lang="scss" scoped>
.elevate {
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
}

.dark {
  background-color: #333; /* Cambia el color de fondo a oscuro */
}

/* Estilos de texto en modo oscuro */
.v-application.dark {
  color: #fff; /* Color de texto principal en modo oscuro */
}
</style>
