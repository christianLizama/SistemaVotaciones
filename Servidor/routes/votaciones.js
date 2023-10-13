const express = require("express");
const router = express.Router();

const Votaciones = require("../models/votaciones");
const { populate } = require("../models/users");

router.get("/", (req, res) => {
  Votaciones.find()
    .then((votaciones) => {
      res.send({ votaciones });
    })
    .catch((err) => console.error(err));
});

router.get("/votaciones/:id", (req, res) => {
  Votaciones.findById(req.params.id)
    .then((votaciones) => {
      res.send({ votaciones });
    })
    .catch((err) => console.error(err));
});

// haz un metodo que devuelva las votaciones de un usuario si es que se encuentra en participantes
router.get("/participante/:id", (req, res) => {

    Votaciones.find({ idParticipantes: req.params.id })
    .then((votaciones) => {
        res.send({ votaciones });
      })
      .catch((err) => console.error(err));
});

router.post("/votaciones", (req, res) => {
  const votaciones = new Votaciones(req.body);
  votaciones
    .save()
    .then(() => {
      res.send({ votaciones });
    })
    .catch((err) => console.error(err));
});

router.put("/votaciones/:id", (req, res) => {
  Votaciones.findById(req.params.id)
    .then((votaciones) => {
      votaciones.idParticipantes = req.body.idParticipantes;
      votaciones.idCandidatos = req.body.idCandidatos;
      votaciones.estado = req.body.estado;
      return votaciones.save();
    })
    .then((votaciones) => {
      res.send({ votaciones });
    })
    .catch((err) => console.error(err));
});

router.delete("/votaciones/:id", (req, res) => {
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
