<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm6 md4>
        <v-card>
          <v-card-title class="headline">Inicio de Sesión</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="correo"
                label="Correo electrónico"
              ></v-text-field>
              <v-text-field
                v-model="clave"
                label="Contraseña"
                type="password"
              ></v-text-field>
              <v-btn color="primary" type="submit">Iniciar Sesión</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Papa from 'papaparse';

export default {
  name: "LoginComponente",
  data() {
    return {
      correo: '',
      clave: '',
    };
  },
  methods: {
    login() {
      // Simulamos la lectura del archivo CSV (esto no es seguro en producción)
      const file = '../BD/datosEjemplo';
      
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const usuarios = results.data;
          const usuario = usuarios.find(
            (user) =>
              user.correo === this.correo &&
              user.clave === this.clave
          );

          if (usuario) {
            // Redirige a diferentes menús según el tipo de usuario
            if (usuario.tipo === 1) {
              this.$router.push('/admin-menu');
            } else if (usuario.tipo === 2) {
              this.$router.push('/user-menu');
            } else {
              alert('Usuario no válido');
            }
          } else {
            alert('Credenciales incorrectas');
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
