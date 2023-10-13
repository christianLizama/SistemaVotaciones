<template>
  <div id="app" class="centered-layout">
    <side-drawer @navigate="updateCurrentSection" :drawer-style="drawerStyle" />
    <main-content :current-section="currentSection" />
  </div>
</template>

<script>
import SideDrawer from "./components/SideDrawer.vue";
import MainContent from "./components/MainContent.vue";

export default {
  data() {
    return {
      drawerStyle: {
        // Estilo de tu cajón de navegación
      },
      currentSection: "mensajes", // Inicializa la sección actual
    };
  },
  methods: {
    updateCurrentSection(section) {
      // Actualiza la sección actual cuando se navega desde el cajón de navegación
      this.currentSection = section;
    },
  },
  components: {
    SideDrawer,
    MainContent,
  },
};
</script>

<style scoped>
.centered-layout {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 100vh; /* Utiliza toda la altura de la ventana */
}
</style>
