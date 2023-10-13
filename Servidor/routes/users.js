const express = require("express");
const router = express.Router();
// const fs = require('fs');
// const csv = require('csv-parser');
const User = require("../models/users"); // Asegúrate de importar el modelo de usuario que creaste
// router.get('/import', (req, res) => {
//   fs.createReadStream('./datosEjemplo.csv')
//     .pipe(csv({ separator: ';' }))
//     .on('data', (row) => {
//       // Omitir la columna 'id' al crear el objeto usuario
//       const { id, ...userData } = row;
//       const user = new User(userData);
//       user.save()
//         .then(() => console.log('Usuario guardado en MongoDB'))
//         .catch((err) => console.error('Error al guardar usuario:', err));
//     })
//     .on('end', () => {
//       res.send('Proceso de importación completado');
//     });
// });

router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      console.log(users);
      res.send({ users });
    })
    .catch((err) => console.error(err));
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((users) => {
      res.send("users", { users });
    })
    .catch((err) => console.error(err));
});

router.post("/", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send("users", { user });
    })
    .catch((err) => console.error(err));
});

router.put("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.nombre = req.body.nombre;
      user.apellido = req.body.apellido;
      user.email = req.body.email;
      user.password = req.body.password;
      user.tipo = req.body.tipo;
      return user.save();
    })
    .then((user) => {
      res.send("users", { user});
    })
    .catch((err) => console.error(err));
});

router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      return user.remove();
    })
    .then(() => {
      res.send("users", { message: "Usuario eliminado correctamente" });
    })
    .catch((err) => console.error(err));
});

module.exports = router;
