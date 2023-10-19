<template>
  <div>
    <!-- Botón para crear una nueva votación -->
    <v-btn icon @click="abrirDialogo" color="primary" x-large>
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <!-- Itera a través de las votaciones y muestra cada una en una tarjeta -->
    <v-card
      v-for="(votacion, index) in votaciones"
      :key="votacion._id"
      class="mb-3"
    >
      <v-card-title> Votación {{ index + 1 }} </v-card-title>
      <v-card-text>
        <p>Candidatos:</p>
        <ul>
          <li v-for="candidato in votacion.candidatos" :key="candidato._id">
            {{ candidato.nombre }}
          </li>
        </ul>
        <p>Participantes:</p>
        <ul>
          <li
            v-for="participante in votacion.participantes"
            :key="participante._id"
          >
            {{ participante.nombre }}
          </li>
        </ul>
        <p>Estado: {{ votacion.estado ? "Activo" : "Inactivo" }}</p>
        <p>Tipo de votación: {{ votacion.tipo === 1 ? "Alumno" : "Profesor" }}</p>

      </v-card-text>
    </v-card>

    <!-- Diálogo para elegir el tipo de usuario -->
    <v-dialog v-model="tipoUsuarioDialogVisible" max-width="500">
      <v-card>
        <v-card-title>Elige el tipo de usuario</v-card-title>
        <v-card-text>
          <v-radio-group v-model="tipoUsuarioSeleccionado">
            <v-radio label="Alumno" value="alumno"></v-radio>
            <v-radio label="Profesor" value="profesor"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="cargarUsuarios">Siguiente</v-btn>
          <v-btn color="red" @click="cerrarTipoUsuarioDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo para elegir participantes y candidatos -->
    <v-dialog v-model="dialogVisible" max-width="500">
      <v-card>
        <v-card-title>Elige participantes y candidatos</v-card-title>
        <v-card-text>
          <v-select
            v-if="tipoUsuarioSeleccionado === 'alumno'"
            v-model="candidatosSeleccionados"
            :items="alumnos"
            label="Candidatos"
            item-text="nombre"
            multiple
            return-object
          ></v-select>
          <v-select
            v-else
            v-model="candidatosSeleccionados"
            :items="profesores"
            label="Candidatos"
            item-text="nombre"
            multiple
            return-object
          ></v-select>
          <v-select
            v-if="tipoUsuarioSeleccionado === 'alumno'"
            v-model="participantesSeleccionados"
            :items="alumnos"
            label="Participantes"
            item-text="nombre"
            multiple
            return-object
          ></v-select>
          <v-select
            v-else
            v-model="participantesSeleccionados"
            :items="profesores"
            label="Participantes"
            item-text="nombre"
            multiple
            return-object
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="guardarVotacion">Guardar</v-btn>
          <v-btn color="red" @click="cerrarDialogo">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CrearVotacionView",
  created() {
    this.obtenerVotaciones();
  },
  data() {
    return {
      votaciones: [],
      tipoUsuarioDialogVisible: false,
      tipoUsuarioSeleccionado: "alumno",
      dialogVisible: false,
      participantesSeleccionados: [],
      candidatosSeleccionados: [],
      alumnos: [],
      profesores: [],
    };
  },
  props: {},
  methods: {
    async obtenerVotaciones() {
      try {
        const response = await axios.get(
          "http://localhost:3000/votaciones/getVotaciones"
        );
        this.votaciones = response.data.votaciones;
      } catch (error) {
        console.error(error);
      }
    },
    abrirDialogo() {
      this.tipoUsuarioDialogVisible = true;
    },
    cerrarTipoUsuarioDialog() {
      this.tipoUsuarioDialogVisible = false;
      //limpiar los arreglos de participantes y candidatos
      this.participantesSeleccionados = [];
      this.candidatosSeleccionados = [];
    },
    cargarUsuarios() {
      // Llama a los métodos para obtener la lista de alumnos y profesores
      if (this.tipoUsuarioSeleccionado === "alumno") {
        this.obtenerAlumnos();
      } else {
        this.obtenerProfesores();
      }
      this.dialogVisible = true;
      this.tipoUsuarioDialogVisible = false;
    },
    async obtenerAlumnos() {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/getAlumnos"
        );
        this.alumnos = response.data.alumnos;
      } catch (error) {
        console.error(error);
      }
    },
    async obtenerProfesores() {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/getProfesores"
        );
        this.profesores = response.data.profesores;
      } catch (error) {
        console.error(error);
      }
    },
    guardarVotacion() {
      //verificar que se hayan seleccionado participantes y candidatos
      if (
        this.participantesSeleccionados.length === 0 ||
        this.candidatosSeleccionados.length === 0
      ) {
        alert("No se han seleccionado participantes o candidatos");
        return;
      }
      //verificar que los candidatos si estén dentro de los participantes
      const participantesIds = this.participantesSeleccionados.map(
        (participante) => participante._id
      );
      const candidatosIds = this.candidatosSeleccionados.map(
        (candidato) => candidato._id
      );
      const candidatosNoParticipantes = candidatosIds.filter(
        (candidatoId) => !participantesIds.includes(candidatoId)
      );

      if (candidatosNoParticipantes.length > 0) {
        alert("No todos los candidatos están dentro de los participantes");
        return;
      }

      let tipoVotacion = 2;

      if (this.tipoUsuarioSeleccionado === "alumno") {
        tipoVotacion = 1;
      }

      // Crea una nueva votación con los IDs de los participantes y candidatos
      const votacion = {
        participantes: this.participantesSeleccionados.map(
          (participante) => participante._id
        ),
        candidatos: this.candidatosSeleccionados.map(
          (candidato) => candidato._id
        ),
        estado: true,
        tipo: tipoVotacion,
      };
      axios
        .post("http://localhost:3000/votaciones/addVotacion", votacion)
        .then((response) => {
          // Agrega la votación a la lista de votaciones
          this.votaciones.push(response.data.votacionCreada);
          // Cierra el diálogo
          this.cerrarDialogo();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    cerrarDialogo() {
      this.dialogVisible = false;
      //limpiar los arreglos de participantes y candidatos
      this.participantesSeleccionados = [];
      this.candidatosSeleccionados = [];
    },
  },
};
</script>
