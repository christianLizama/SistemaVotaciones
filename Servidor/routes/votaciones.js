const express = require("express");
const router = express.Router();

const Votaciones = require("../models/votaciones");
const { populate } = require("../models/users");

//obtener solo las votaciones de tipo 1 (alumnos)
router.get("/getVotacionesAlumnos/:id", async (req, res) => {
  const alumnoId = req.params.id; // Obtén el ID del parámetro de la URL
  console.log(alumnoId);

  try {
    const votaciones = await Votaciones.find({
      tipo: 1,
      estado: true,
      participantes: alumnoId, // Verifica si el ID está presente en la lista de participantes
    })
      .populate("participantes")
      .populate("candidatosM.candidatoId")
      .populate("candidatosF.candidatoId");

    res.send({ votaciones });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "Error al obtener las votaciones de los alumnos" });
  }
});

//obtener solo las votaciones de tipo 2 (profesores)
router.get("/getVotacionesProfesores/:id", async (req, res) => {
  const profesorId = req.params.id; // Obtén el ID del profesor desde el parámetro de la URL
  console.log(profesorId);

  try {
    const votaciones = await Votaciones.find({
      tipo: 2, // Tipo de votación de profesores
      estado: true,
      participantes: profesorId, // Verifica si el ID del profesor está presente en la lista de participantes
    })
      .populate("participantes")
      .populate("candidatosM.candidatoId")
      .populate("candidatosF.candidatoId");
    res.send({ votaciones });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "Error al obtener las votaciones de los profesores" });
  }
});

router.get("/getVotaciones", (req, res) => {
  //obtener votaciones populando los participantes y candidatos
  Votaciones.find()
    .populate("participantes")
    .populate("candidatosM.candidatoId")
    .populate("candidatosF.candidatoId")
    .then((votaciones) => {
      res.send({ votaciones });
    })
    .catch((err) => console.error(err));
});

router.get("/searchVotacion/:id", (req, res) => {
  Votaciones.findById(req.params.id)
    .then((votaciones) => {
      res.send({ votaciones });
    })
    .catch((err) => console.error(err));
});

router.post("/addVotacion", async (req, res) => {
  try {
    const newVotacion = new Votaciones(req.body);
    await newVotacion.save();

    // Realiza la consulta para obtener la votación con participantes y candidatos populados
    const votacionCreada = await Votaciones.findById(newVotacion._id)
      .populate("participantes", "nombre") // Reemplaza "nombre" con los campos que desees mostrar
      .populate("candidatosF.candidatoId", "nombre") // Reemplaza "nombre" con los campos que desees mostrar
      .populate("candidatosM.candidatoId", "nombre") // Reemplaza "nombre" con los campos que desees mostrar
      .exec();

    console.log(votacionCreada);

    res.send({ votacionCreada });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al crear la votación");
  }
});

//Cambiar estado de la votación
router.put("/updateVotacion/:id", (req, res) => {
  const { estado, candidatosM, candidatosF, participantes } = req.body;
  Votaciones.findById(req.params.id)
    .then((votacion) => {
      votacion.participantes = participantes;
      votacion.candidatosM = candidatosM;
      votacion.candidatosF = candidatosF;
      votacion.estado = estado;
      const votacionActualizada = votacion.save();
      return votacionActualizada;
    })
    .then((votacionFinal) => {
      res.send({ votacionFinal });
    })
    .catch((err) => console.error(err));
});

router.delete("/deleteVotacion/:id", (req, res) => {
  Votaciones.findById(req.params.id)
    .then((votaciones) => {
      return votaciones.remove();
    })
    .then(() => {
      res.send({ message: "votaciones eliminado correctamente" });
    })
    .catch((err) => console.error(err));
});

module.exports = router;
