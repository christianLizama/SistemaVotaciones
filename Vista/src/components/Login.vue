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
import axios from 'axios';

export default {
  name: "LoginComponente",
  data() {
    return {
      correo: '',
      clave: '',
    };
  },
  methods: {
    async login() {
      await axios.post('http://localhost:3030/users/login', {
        email: this.correo,
        password: this.clave,
      }).then((response) => {
        const user = response.data.userFind;
        const userSave = {
          _id: user._id,
          nombre: user.nombre,
          apellido: user.apellido,
          correo: user.correo,
          tipo: user.tipo,
        }
        //Guardar el usuario en el store
        this.$store.dispatch("guardarUsuario", userSave);
        //Verificar el tipo de usuario
        if(userSave.tipo === 3){
          this.$router.push('/crearVotacion');
        }
        else{
          this.$router.push('/votar');
        }
      }).catch((error) => {
        console.log(error);
      });  
    },
  },
};
</script>

<style lang="scss" scoped></style>
