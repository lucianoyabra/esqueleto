'use strict'

var express = require('express');
var bodyparser = require('body-parser');
// Create link to Angular build directory
const configMensaje = require("./configMensaje");

var app = express();
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
//Cargar Rutas
var table_routes = require('./routes/table');
var reserve_routes = require('./routes/reserve');
var event_routes = require('./routes/event');
var user_routes = require('./routes/user');
var salon_routes = require('./routes/salon');

const cors = require("cors");
app.use(cors({origin:"*"}));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//Configurar Cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});



// rutas base
app.use('/api',user_routes);
app.use('/api',table_routes);
app.use('/api',reserve_routes);
app.use('/api',event_routes);
app.use('/api',salon_routes);

/*app.get('/pruebas', function(req,res){
    res.status(200).send({message: 'bienvenido al curso spotify'});
})
*/
app.post('/formulario', (req, res) => {
  console.log('paso por el app.js POST');
  alert('Ahi va a mandar el mail');
  configMensaje(req.body);
  res.status(200).send();
 });

module.exports = app;
