const express = require("express");
const router = express.Router();

const Votaciones = require("../models/votaciones");
const { populate } = require("../models/users");

//obtener solo las votaciones de tipo 1 (alumnos)
router.get("/getVotacionesAlumnos", async (req, res) => {
  await Votaciones.find({ tipo: 1 , estado: true})
    .then((votaciones) => {
      res.send({ votaciones });
    })
    .catch((err) => console.error(err));
});

//obtener solo las votaciones de tipo 2 (profesores)
router.get("/getVotacionesProfesores", async (req, res) => {
  await Votaciones.find({ tipo: 2 , estado: true})
    .then((votaciones) => {
      res.send({ votaciones });
    })
    .catch((err) => console.error(err));
});

router.get("/getVotaciones", (req, res) => {
  //obtener votaciones populando los participantes y candidatos
  Votaciones.find()
    .populate("participantes")
    .populate("candidatos")
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
      .populate("candidatos", "nombre") // Reemplaza "nombre" con los campos que desees mostrar
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
  const { estado, candidatos, participantes } = req.body;
  Votaciones.findById(req.params.id)
    .then((votacion) => {
      votacion.participantes = participantes;
      votacion.candidatos = candidatos;
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
