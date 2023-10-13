var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var port = process.env.PORT || 3010; // Establece el puerto en 3000 o el valor de la variable de entorno PORT

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.set('port', port); // Configura el puerto en la aplicación

app.listen(port, () => {
  console.log(`La aplicación está escuchando en el puerto ${port}`);
});

module.exports = app;
