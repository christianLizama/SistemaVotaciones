<template>
    <div class="content">
      <!-- Mensajes -->
      <div v-if="currentSection === 'mensajes'">
        <h1>Mensajes</h1>
      </div>
  
      <!-- Votaciones -->
      <div v-if="currentSection === 'votaciones'">
        <h1>Votaciones</h1>
        <div>
          <b-table striped hover :items="items"></b-table>
        </div>
      </div>
  
      <!-- Resultados -->
      <div v-if="currentSection === 'resultados'">
        <h1>Resultados</h1>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    },
    props: {
      currentSection: String,
    },
  };
  </script>
  
  <style lang="scss" scoped>
  /* Estilos para el contenido principal */
  .content {
    padding: 500px;
    background-color: #252525; /* Color de fondo */
    color: #fff; /* Color de texto (letras blancas) */
  }
  </style>
  