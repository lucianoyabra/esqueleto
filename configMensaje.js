'use strict'

const nodemailer = require('nodemailer');

function send(formulario){
 var transporter = nodemailer.createTransport({
  host:"in-v3.mailjet.com",
  port:587,
  auth:{
    user: "4cbd5249f600247cbc93feb7ea46f022",
    pass: "53de9b997c3a99b37cc1911a2d3ec44f"
  }



 });

/*
  service: 'gmail',
  host:"smtp.gmail.com",
  secureConnection: true, // use SSL
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth:{
    user: "lucianoyabra@gmail.com",
    pass: "Sashita9"
  }



    host:"in-v3.mailjet.com",
    port:587,
    auth:{
      user: "4cbd5249f600247cbc93feb7ea46f022",
      pass: "53de9b997c3a99b37cc1911a2d3ec44f"
    }
  });
*/

const mailOptions = {
 from: '<'+ formulario.email + '>',
 to: 'luchoyabra@hotmail.com', // Cambia esta parte por el destinatario
 subject: formulario.asunto,
 html: `
 <strong>Nombre:</strong> ${formulario.nombre} <br/>
 <strong>E-mail:</strong> ${formulario.email} <br/>
 <strong>Mensaje:</strong> ${formulario.mensaje}
 `
 };
 console.log('mensaje desde el configMensaje');

/*
transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 });
 */
}

module.exports = {
send
}
