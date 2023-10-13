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
      
    },
  },
};
</script>

<style lang="scss" scoped></style>
