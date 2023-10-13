const express = require("express");
const router = express.Router();   
const Votos = require("../models/votos");

router.get("/", (req, res) => {
    Votos.find()
        .then((votos) => {
            res.send({ votos });
        })
        .catch((err) => console.error(err));
}
);

router.get("/votos/:id", (req, res) => {
    Votos.findById(req.params.id)
        .then((votos) => {
            res.send({ votos });
        })
        .catch((err) => console.error(err));
}
);

router.post("/votos", (req, res) => {
    const votos = new Votos(req.body);
    votos
        .save()
        .then(() => {
            res.send({ votos });
        })
        .catch((err) => console.error(err));
}
);

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
}
);

router.delete("/votos/:id", (req, res) => {
    Votos.findById(req.params.id)
        .then((votos) => {
            return votos.remove();
        })
        .then(() => {
            res.send({ message: "votos eliminado correctamente" });
        })
        .catch((err) => console.error(err));
}
);

module.exports = router;

