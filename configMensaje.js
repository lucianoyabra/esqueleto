'use strict'

const nodemailer = require('nodemailer');

function send(formulario){
 var transporter = nodemailer.createTransport({
  service: 'gmail',
  host:"smtp.gmail.com",
  secureConnection: true, // use SSL
  port: 465,
  secure: true,
  auth:{
    user: "lucianoyabra@gmail.com",
    pass: "Sashita9"
  }
 });

/*
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
      user: "lucianoyabra@gmail.com",
      pass: "Sashita9"
    }
  });
*/

const mailOptions = {
 from: `"${formulario.nombre} " <${formulario.email}>`,
 to: 'luchoyabra@hotmail.com', // Cambia esta parte por el destinatario
 subject: formulario.asunto,
 html: `
 <strong>Nombre:</strong> ${formulario.nombre} <br/>
 <strong>E-mail:</strong> ${formulario.email} <br/>
 <strong>Mensaje:</strong> ${formulario.mensaje}
 `
 };

transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 });
}

module.exports = {
send
}
