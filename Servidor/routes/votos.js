const express = require("express");
const router = express.Router();
const Votos = require("../models/votos");
const votaciones = require("../models/votaciones");

router.get("/getVotos", (req, res) => {
  Votos.find()
    .then((votos) => {
      res.send({ votos });
    })
    .catch((err) => console.error(err));
});

//Metodo que obtenga los votos de un usuario
router.get("/getVotosUsuario/:id", (req, res) => {
  Votos.find({ usuarioId: req.params.id })
    .then((votos) => {
      res.send({ votos });
    })
    .catch((err) => console.error(err));
});

router.get("/getVoto/:id", (req, res) => {
  Votos.findById(req.params.id)
    .then((votos) => {
      res.send({ votos });
    })
    .catch((err) => console.error(err));
});

router.post("/postVoto", (req, res) => {
  const votos = new Votos(req.body);
  votos
    .save()
    .then(() => {
      //obtener votacion y actualizar cantidad de votos a ese usuario
      votaciones
        .findById(req.body.votacionId)
        .then((votacion) => {
          let contador = 0;
          votacion.candidatosF.forEach((candidato) => {
            if (candidato.candidatoId == req.body.candidatoIdF) {
              candidato.votos = candidato.votos + 1;
              contador++;
            }
          });
          votacion.candidatosM.forEach((candidato) => {
            if (candidato.candidatoId == req.body.candidatoIdM) {
              candidato.votos = candidato.votos + 1;
              contador++;
            }
          });
          if (contador == 2) {
            votacion.save().then(() => {
              res.status(200).send({ votos });
            });
          } else {
            res.status(404).send("Error al crear el voto");
          }
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
});

router.put("/votos/:id", (req, res) => {
  Votos.findById(req.params.id)
    .then((votos) => {
      votos.usuarioId = req.body.usuarioId;
      votos.votacionId = req.body.votacionId;
      votos.candidatoId = req.body.candidatoId;
      return votos.save();
    })
    .then((votos) => {
      res.send({ votos });
    })
    .catch((err) => console.error(err));
});

router.delete("/votos/:id", (req, res) => {
  Votos.findById(req.params.id)
    .then((votos) => {
      return votos.remove();
    })
    .then(() => {
      res.send({ message: "votos eliminado correctamente" });
    })
    .catch((err) => console.error(err));
});

module.exports = router;
