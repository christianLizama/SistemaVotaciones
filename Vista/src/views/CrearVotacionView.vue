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
        <h3>Candidatos:</h3>
        <ul>
          <h4>Hombres:</h4>
          <li v-for="hombre in votacion.candidatosM" :key="hombre.candidatoId._id">
            {{ hombre.candidatoId.nombre }}
          </li>
          <h4>Mujeres:</h4>
          <li v-for="mujer in votacion.candidatosF" :key="mujer.candidatoId._id">
            {{ mujer.candidatoId.nombre }}
          </li>
        </ul>
        <h3>Participantes:</h3>
        <ul>
          <li
            v-for="participante in votacion.participantes"
            :key="participante._id"
          >
            {{ participante.nombre }}
          </li>
        </ul>
        <h3>Estado: </h3>
        <li>{{ votacion.estado ? "Activo" : "Inactivo" }}</li>
        <h3>
          Tipo de votación: 
        </h3>
        <li>{{ votacion.tipo === 1 ? "Alumno" : "Profesor" }}</li>
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
            v-model="candidatosSeleccionadosM"
            :items="alumnosM"
            label="Candidatos Masculinos"
            item-text="nombre"
            multiple
            return-object
          ></v-select>
          <v-select
            v-if="tipoUsuarioSeleccionado === 'alumno'"
            v-model="candidatosSeleccionadosF"
            :items="alumnosF"
            label="Candidatos Femeninos"
            item-text="nombre"
            multiple
            return-object
          ></v-select>
          <v-select
            v-if="tipoUsuarioSeleccionado === 'alumno'"
            v-model="participantesSeleccionados"
            :items="todosAlumnos"
            label="Alumnos participantes"
            item-text="nombre"
            multiple
            return-object
          ></v-select>
          <v-select
            v-if="tipoUsuarioSeleccionado === 'profesor'"
            v-model="candidatosSeleccionadosM"
            :items="profesoresM"
            label="Candidatos Masculinos"
            item-text="nombre"
            multiple
            return-object
          ></v-select>
          <v-select
            v-if="tipoUsuarioSeleccionado === 'profesor'"
            v-model="candidatosSeleccionadosF"
            :items="profesoresF"
            label="Candidatos Femeninos"
            item-text="nombre"
            multiple
            return-object
          ></v-select>
          <v-select
            v-if="tipoUsuarioSeleccionado === 'profesor'"
            v-model="participantesSeleccionados"
            :items="todosProfesores"
            label="Profesores participantes"
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
      candidatosSeleccionadosM: [],
      candidatosSeleccionadosF: [],
      alumnosM: [],
      alumnosF: [],
      todosAlumnos: [],
      profesoresM: [],
      profesoresF: [],
      todosProfesores: [],
    };
  },
  methods: {
    async obtenerVotaciones() {
      try {
        const response = await axios.get(
          "http://localhost:3030/votaciones/getVotaciones"
        );
        this.votaciones = response.data.votaciones;
        console.log(response.data.votaciones);
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
      this.candidatosSeleccionadosM = [];
      this.candidatosSeleccionadosF = [];
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
          "http://localhost:3030/users/getAlumnos"
        );
        console.log(response.data);
        this.alumnosM = response.data.AlumnosM;
        this.alumnosF = response.data.AlumnosF;
        this.todosAlumnos = this.alumnosM.concat(this.alumnosF);
      } catch (error) {
        console.error(error);
      }
    },
    async obtenerProfesores() {
      try {
        const response = await axios.get(
          "http://localhost:3030/users/getProfesores"
        );
        this.profesoresM = response.data.profesoresM;
        this.profesoresF = response.data.profesoresF;
        this.todosProfesores = this.profesoresM.concat(this.profesoresF);
      } catch (error) {
        console.error(error);
      }
    },
    guardarVotacion() {
      // Verificar que se hayan seleccionado participantes y candidatos
      if (
        this.participantesSeleccionados.length === 0 ||
        (this.candidatosSeleccionadosM.length === 0 &&
          this.candidatosSeleccionadosF.length === 0)
      ) {
        alert("No se han seleccionado participantes o candidatos");
        return;
      }

      // Crear un arreglo de todos los candidatos
      const candidatosMIds = this.candidatosSeleccionadosM.map(
        (candidato) => candidato._id
      );
      const candidatosFIds = this.candidatosSeleccionadosF.map(
        (candidato) => candidato._id
      );

      // Crear un arreglo de todos los participantes
      const participantesIds = this.participantesSeleccionados.map(
        (participante) => participante._id
      );

      // Verificar que todos los candidatos masculinos estén dentro de los participantes
      const candidatosMNoParticipantes = candidatosMIds.filter(
        (candidatoId) => !participantesIds.includes(candidatoId)
      );

      // Verificar que todos los candidatos femeninos estén dentro de los participantes
      const candidatosFNoParticipantes = candidatosFIds.filter(
        (candidatoId) => !participantesIds.includes(candidatoId)
      );

      if (candidatosMNoParticipantes.length > 0) {
        alert(
          "Algunos candidatos masculinos no están dentro de los participantes"
        );
        return;
      }

      if (candidatosFNoParticipantes.length > 0) {
        alert(
          "Algunos candidatos femeninos no están dentro de los participantes"
        );
        return;
      }

      let tipoVotacion = 2;

      if (this.tipoUsuarioSeleccionado === "alumno") {
        tipoVotacion = 1;
      }
      let candidatosFinalesM = [];
      let candidatosFinalesF = [];
      
      this.candidatosSeleccionadosM.forEach(candidatosM => {
        const candidato = {
          candidatoId: candidatosM._id,
          votos: 0,
        }
        candidatosFinalesM.push(candidato);
      });

      this.candidatosSeleccionadosF.forEach(candidatosF => {
        const candidato = {
          candidatoId: candidatosF._id,
          votos: 0,
        }
        candidatosFinalesF.push(candidato);
      });

      // Crea una nueva votación con los IDs de los participantes y candidatos
      const votacion = {
        participantes: this.participantesSeleccionados.map(
          (participante) => participante._id
        ),
        candidatosM: candidatosFinalesM,
        candidatosF: candidatosFinalesF,
        estado: true,
        tipo: tipoVotacion,
      };
      axios
        .post("http://localhost:3030/votaciones/addVotacion", votacion)
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
      this.candidatosSeleccionadosM = [];
      this.candidatosSeleccionadosF = [];
    },
  },
};
</script>
