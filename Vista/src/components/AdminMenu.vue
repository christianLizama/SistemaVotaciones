<template>
  <v-app>
    <v-app-bar app class="app-bar">
      <v-app-bar-nav-icon @click.stop="toggleDrawer" class="app-icon"></v-app-bar-nav-icon>
      <h2 class="panel-title">Panel de Administrador</h2>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <i class="v-icon notranslate mdi mdi-dots-vertical theme--light"></i>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">Cerrar Sesión</v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer app class="drawer" :style="drawerStyle">
      <v-list>
        <v-list-item-group>
          <v-list-item @click="showEnviarMensajes = !showEnviarMensajes">
            <v-list-item-content>
              <v-icon class="icon">{{ showEnviarMensajes ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              <span class="text">Mensajes</span>
            </v-list-item-content>
          </v-list-item>
          <v-slide-y-transition>
            <v-list-item v-show="showEnviarMensajes">
              <v-list-item-content>
                <v-btn @click="showMensajeMasivo = true" class="custom-button primary">Mensaje Masivo</v-btn>
                <v-btn @click="showFormularioCorreoIndividual = true" class="custom-button primary">Correo Individual</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-slide-y-transition>
          
          <v-list-item @click="showVotaciones = !showVotaciones">
            <v-list-item-content>
              <v-icon class="icon">{{ showVotaciones ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              <span class="text">Votaciones</span>
            </v-list-item-content>
          </v-list-item>
          <v-slide-y-transition>
            <v-list-item v-show="showVotaciones">
              <v-list-item-content>
                <v-btn @click="showOpcionesVotacion = true" class="custom-button success">Iniciar</v-btn>
                <v-btn @click="showVotacionesVigentes = true" class="custom-button error">Cerrar</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-slide-y-transition>
          
          <v-list-item @click="showResultados = !showResultados">
            <v-list-item-content>
              <v-icon class="icon">{{ showResultados ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              <span class="text">Resultados</span>
            </v-list-item-content>
          </v-list-item>
          <v-slide-y-transition>
            <v-list-item v-show="showResultados">
              <v-list-item-content>
                <v-btn @click="verResultadosParciales" class="custom-button primary">Parciales</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-slide-y-transition>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    
    <div class="content">
      <!-- Vista de mensaje masivo (mostrada cuando showMensajeMasivo es true) -->
      <div v-if="showMensajeMasivo" class="mensaje-masivo">
        <h3 class="subtitulo">Enviar Mensaje Masivo</h3>
        <v-text-field v-model="mensajeMasivo" label="Mensaje"></v-text-field>
        <v-btn @click="enviarMensajeMasivo" class="custom-button primary">Enviar</v-btn>
        <v-btn @click="showMensajeMasivo = false" class="custom-button error">Cancelar</v-btn>
      </div>
        
      <!-- Formulario de mensaje individual -->
      <div v-if="showFormularioCorreoIndividual" class="formulario-correo-individual">
        <h3 class="subtitulo">Correo Individual</h3>
        <v-autocomplete
          v-model="usuarioSeleccionado"
          :items="usuarios"
          label="Buscar Usuario"
          item-text="nombre"
        ></v-autocomplete>
        <v-text-field v-model="mensajeCorreoIndividual" label="Mensaje"></v-text-field>
        <v-btn @click="enviarCorreoIndividual" class="custom-button primary">Enviar</v-btn>
        <v-btn @click="showFormularioCorreoIndividual = false" class="custom-button error">Cancelar</v-btn>
      </div>
      
      <!-- Tabla de votaciones (mostrada cuando showTablaVotaciones es true) -->
      <div v-if="showTablaVotaciones" class="tabla-votaciones">
        <h3 class="subtitulo">Tabla de Votaciones</h3>
        <!-- Agrega aquí tu tabla de votaciones -->
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      showEnviarMensajes: false,
      showMensajeMasivo: false,
      showVotaciones: false,
      showResultados: false,
      showTablaVotaciones: false, // Agregamos un nuevo flag para mostrar la tabla de votaciones
      mensajeMasivo: '',
      showFormularioCorreoIndividual: false,
      usuarioSeleccionado: null,
      mensajeCorreoIndividual: '',
      votaciones: [], // Carga tus votaciones aquí
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
    
    enviarMensajeMasivo() {
      this.showMensajeMasivo = false;
      this.mensajeMasivo = '';
    },
    enviarCorreoIndividual() {
      this.showFormularioCorreoIndividual = false;
      this.usuarioSeleccionado = null;
      this.mensajeCorreoIndividual = '';
    },
    
    showOpcionesVotacion() {
      this.showTablaVotaciones = true; // Mostrar la tabla al iniciar votaciones
    },
    iniciarVotacion() {
      // Lógica para procesar opciones de votación
      this.showTablaVotaciones = false; // Ocultar la tabla al finalizar la votación
    },
    logout() {
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>


<style lang="scss" scoped>
.drawer {
  background-color: #333;
}

icon {
  color: #fff;
  margin-right: 10px;
}

.text {
  color: #fff;
  font-size: 16px;
}

app-bar {
  background-color: #007BFF;
}

app-icon {
  color: #fff;
}

panel-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-left: 10px;
}

custom-button {
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

custom-button.primary {
  background-color: #007BFF;
  color: #fff;
}

custom-button.success {
  background-color: #28A745;
  color: #fff;
}

custom-button.error {
  background-color: #DC3545;
  color: #fff;
}

custom-button:hover {
  background-color: #0056b3;
}

content {
  padding: 20px;
}

mensaje-masivo {
  background-color: #444;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

formulario-correo-individual {
  background-color: #444;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

subtitulo {
  color: #fff;
  font-size: 18px;
  margin-bottom: 10px;
}
</style>