const nodemailer = require("nodemailer");

module.exports = (formulario) => {
 var transporter = nodemailer.createTransport({
 service: "gmail",
 // port: 465,
 // secure: false,
 // port: 25,
 // host: "smtp.gmail.com",
 auth: {
    user: "lyrswebdesign@gmail.com", // Cambialo por tu email
    pass: "mallorca2508" // Cambialo por tu password
 }
 });



const mailOptions = {
 from: "web",
 to: "luchoyabra@hotmail.com", // Cambia esta parte por el destinatario
 subject: formulario.asunto,
 html: `
 <strong>Nombre:</strong> ${formulario.nombre} <br/>
 <strong>E-mail:</strong> ${formulario.email} <br/>
 <strong>Mensaje:</strong> ${formulario.mensaje}
 `
 };
console.log('Mail options: ' + mailOptions);
transporter.sendMail(mailOptions, function (err, info) {
 if (err){
 console.log('ahi va el error: ' +err)
 }else{
 console.log('ahi va el NO error: ' +info);

 }
});
}
