<template>
  <v-app>
    <v-main>
      <navbar-admin v-if="usuario && usuario.tipo === 3"/>
      <navbar-usuario v-if="usuario && usuario.tipo === 1"/>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import NavbarAdmin from './components/NavbarAdmin.vue';
import NavbarUsuario from './components/NavbarUsuario.vue';
export default {
  components: { NavbarAdmin, NavbarUsuario },
  name: 'App',

  data: () => ({
  }),
  computed:{
    ...mapState(["usuario"]),
  },
  created(){
    //this.$store.dispatch("obtenerContenedores");
    this.$store.dispatch("autoLogin");
  },
};
</script>
