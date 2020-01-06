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
  //configMensaje.send(req.body);
  configMensaje.send(req.body);
  res.status(200).send();
 });

 app.post('/formularioJetContact',(req,res) => {
  let params = req.body;
  const mailjet = require ('node-mailjet')
  .connect('4cbd5249f600247cbc93feb7ea46f022', '53de9b997c3a99b37cc1911a2d3ec44f')
  const request = mailjet
  .post("send", {'version': 'v3.1'})
  .request({
    "Messages":[
      {
        "From": {
          "Email": "lucianoyabra@gmail.com",
          "Name": "Luciano"
        },
        "To": [
          {
            "Email": "luchoyabra@hotmail.com",
            "Name": "Luciano"
          }
        ],
        "Subject": "Nueva contacto desde la web",
        "TextPart":params.mensaje,
        "HTMLPart": `
        <strong>Nombre:</strong> ${params.nombre} <br/>
        <strong>E-mail:</strong> ${params.email} <br/>
        <strong>Mensaje:</strong> ${params.mensaje}
        `,
        "CustomID": "AppGettingStartedTest"
      }
    ]
  })
  request
    .then((result) => {
      res.status(200).send({message: "ok"});
      console.log(result.body)
    })
    .catch((err) => {
      res.status(200).send({message: "error"});
      console.log(err.statusCode)
    })


 });
 if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'src/index.html'));
});

 app.get('/*', function(req, res) {
 //  window.location('https://peaceful-springs-20903.herokuapp.com/');
  res.sendFile(path.join(__dirname, 'client/build', 'src/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});


 app.post('/formularioJetReserve',(req,res) => {
  let params = req.body;
  const mailjet = require ('node-mailjet')
  .connect('4cbd5249f600247cbc93feb7ea46f022', '53de9b997c3a99b37cc1911a2d3ec44f')
  const request = mailjet
  .post("send", {'version': 'v3.1'})
  .request({
    "Messages":[
      {
        "From": {
          "Email": "lucianoyabra@gmail.com",
          "Name": "Luciano"
        },
        "To": [
          {
            "Email": "luchoyabra@hotmail.com",
            "Name": "Luciano"
          }
        ],
        "Subject": "Nueva reserva desde la web",
        "TextPart":"Algo mensajeado",
        "HTMLPart": `
        <strong>Nombre:</strong> ${params.name} <br/>
        <strong>E-mail:</strong> ${params.email} <br/>
        <strong>Phone:</strong> ${params.phone} <br/>
        <strong>Cantidad:</strong> ${params.people} <br/>
        <strong>Fecha:</strong> ${params.date} <br/>
        <strong>Hora:</strong> ${params.time} <br/>
        `,
        "CustomID": "AppGettingStartedTest"
      }
    ]
  })
  request
    .then((result) => {
      res.status(200).send({message: "ok"});
      console.log(result.body)
    })
    .catch((err) => {
      res.status(200).send({message: "error"});
      console.log(err.statusCode)
    })


 });

module.exports = app;
