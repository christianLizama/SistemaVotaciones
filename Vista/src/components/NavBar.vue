<template>
  <v-app-bar app class="app-bar">
    <v-app-bar-nav-icon @click.stop="toggleDrawer" class="app-icon"></v-app-bar-nav-icon>
    <h2 class="panel-title">Panel de Administrador</h2>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    toggleDrawer() {
      this.$emit('toggle-drawer');
    },
    logout() {
      this.$emit('logout');
    },
  },
};
</script>

<style lang="scss" scoped>
.app-bar {
  background-color: #333; /* Color de fondo de la barra de navegación (tono oscuro) */
  color: #fff; /* Color del texto en la barra de navegación (blanco) */
  font-size: 18px;
  font-weight: bold;
}

.app-icon {
  color: #fff; /* Color del icono del menú (blanco) */
}

.panel-title {
  margin-left: 10px;
  /* Puedes agregar más estilos según tus preferencias */
}

/* Estilos para el menú desplegable */
.v-menu {
  color: #fff; /* Color del texto en el menú desplegable (blanco) */
}

/* Estilos para los elementos de la lista del menú desplegable */
.v-list-item {
  color: #fff; /* Color del texto de los elementos de la lista (blanco) */
}

/* Estilos para los elementos de la lista del menú desplegable al hacer hover */
.v-list-item:hover {
  background-color: #555; /* Cambia el color de fondo al hacer hover a un tono más oscuro */
  color: #fff; /* Color del texto al hacer hover (blanco) */
}
</style>
