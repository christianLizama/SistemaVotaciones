<template>
    <v-navigation-drawer app class="drawer" :style="drawerStyle">
      <v-list>
        <v-list-item-group>
          <v-list-item @click="navigateTo('mensajes')">
            <v-list-item-icon>
              <v-icon>mdi-email-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Mensajes</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="navigateTo('votaciones')">
            <v-list-item-icon>
              <v-icon>mdi-poll</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Votaciones</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="navigateTo('resultados')">
            <v-list-item-icon>
              <v-icon>mdi-chart-line</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Resultados</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script>
  export default {
    props: {
      drawerStyle: Object,
    },
    methods: {
      navigateTo(section) {
        this.$emit('navigate', section);
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
.drawer {
  background-color: #333; /* Color de fondo del cajón de navegación */
  font-size: 16px; /* Tamaño de fuente */
}

.drawer .v-list-item {
  transition: background-color 0.3s ease; /* Efecto de transición al pasar el mouse */
}

.drawer .v-list-item:hover {
  background-color: #555; /* Color de fondo al pasar el mouse */
}

.v-list-item-title {
  font-weight: bold; /* Texto en negrita para los títulos */
  color: #fff; /* Color del texto (blanco) */
}

.v-list-item-icon {
  color: #fff; /* Color de los iconos (blanco) */
}
</style>
