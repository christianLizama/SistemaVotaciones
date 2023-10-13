<template>
  <v-app>
    <NavBar @toggle-drawer="toggleDrawer" @logout="logout" />
    <SideDrawer :drawerStyle="drawerStyle" />
    <MainContent />
  </v-app>
</template>

<script>
import NavBar from './NavBar.vue';
import SideDrawer from './SideDrawer.vue';
import MainContent from './MainContent.vue';

export default {
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    drawerStyle() {
      return this.drawer ? {} : { display: 'none' };
    },
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
  components: {
    NavBar,
    SideDrawer,
    MainContent,
  },
};
</script>
