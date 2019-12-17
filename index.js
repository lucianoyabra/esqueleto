'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
// mongodb://<dbuser>:<dbpassword>@ds351428.mlab.com:51428/heroku_5r2jqr3c
mongoose.connect('mongodb://lucho:gallito9@ds353338.mlab.com:53338/heroku_9tkwttw8',(err,res)=>{
//mongoose.connect('mongodb://localhost:27017/RestoApp',(err,res)=>{
    if(err){
        throw err;
    }else{
        console.log('La conexion a la bd está funcionando correctamente');
        app.listen(port,function() {
            console.log('Servidor de la Api Rest está funcionando en puerto ' + port);
        });
    }
});
/*
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function (socket){

    socket.emit('message','Ya mandaron la reserva');
    socket.on('new reserve',(data)=>{
        //socket.join(data);
        //socket.emit('message', 'y ahora mandaron uno');
        //socket.emit('new reserve found', data);
        io.emit('new reserve found', data);
        io.emit('message', 'y ahora mandaron uno');
        //console.log(data);
        });
});

var portSocket = process.env.PORT || 3000;

server.listen(portSocket,()=>{
  console.log('socket io server is listening on port ' + portSocket);
});
*/
