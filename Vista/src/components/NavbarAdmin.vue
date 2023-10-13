<template>
  <div>
    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon><v-icon>mdi-folder</v-icon></v-list-item-icon>
            <v-list-item-title>Votar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon><v-icon>mdi-folder</v-icon></v-list-item-icon>
            <v-list-item-title>Crear Votaciones</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon><v-icon>mdi-folder</v-icon></v-list-item-icon>
            <v-list-item-title>Detener Votaciones</v-list-item-title>
          </v-list-item>
          
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "NavbarAdminComponente",
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
