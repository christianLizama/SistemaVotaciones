var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors');


var app = express();
var port = process.env.PORT || 3030; // Establece el puerto en 3000 o el valor de la variable de entorno PORT

app.use(cors()); // Habilita CORS para todas las rutas

var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://proyecto:bTP5iARuLHXDPicZ@cluster0.lafxcfw.mongodb.net/appVotos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Conexión a MongoDB exitosa'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/votos', require('./routes/votos'));
app.use('/votaciones', require('./routes/votaciones'));

app.set('port', port); // Configura el puerto en la aplicación

app.listen(port, () => {
  console.log(`La aplicación está escuchando en el puerto ${port}`);
});

module.exports = app;
