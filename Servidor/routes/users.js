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

// Obtener solo los usuarios que tengan el rol de 'admin'
router.get("/getProfesores", async (req, res) => {
  await User.find({ tipo: 2 })
    .then((profesores) => {
      res.send({ profesores });
    })
    .catch((err) => console.error(err));
});

// Obtener solo los usuarios que tengan el rol de 'user'
router.get("/getAlumnos", async(req, res) => {
  await User.find({ tipo: 1 })
    .then((alumnos) => {
      res.send({ alumnos });
    })
    .catch((err) => console.error(err));
});

// Login
router.post("/login", async(req, res) => {

  try {
    const {email, password} = req.body;
    const userFind = await User.findOne({ correo: email, clave: password });
    if(!userFind){
      res.status(404).json({message: "Usuario no encontrado"});
      return;
    }
    res.status(200).json({message: "Usuario encontrado", userFind});
  } catch (error) {
    console.log(error);  
  }
  
});

router.get("/getUsers", async(req, res) => {
  //Obtener solo usuarios con tipo 1 (alumnos) y 2 (profesores)
  await User.find({ tipo: { $in: [1, 2] } })
    .then((users) => {
      res.send({ users });
    })
    .catch((err) => console.error(err));
});

router.get("/:id", async (req, res) => {
  await User.findById(req.params.id)
    .then((users) => {
      res.send("users", { users });
    })
    .catch((err) => console.error(err));
});

router.post("/postUser", async(req, res) => {
  const user = new User(req.body);
  await user
    .save()
    .then(() => {
      res.send("users", { user });
    })
    .catch((err) => console.error(err));
});

router.put("/:id", async(req, res) => {
  await User.findById(req.params.id)
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

router.delete("/:id", async(req, res) => {
  await User.findById(req.params.id)
    .then((user) => {
      return user.remove();
    })
    .then(() => {
      res.send("users", { message: "Usuario eliminado correctamente" });
    })
    .catch((err) => console.error(err));
});

module.exports = router;
