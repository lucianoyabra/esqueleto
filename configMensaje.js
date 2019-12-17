const nodemailer = require("nodemailer");

module.exports = (formulario) => {
 var transporter = nodemailer.createTransport({
 //service: "gmail",
 port: 465,
 secure: false,
 port: 25,
 host: "smtp.gmail.com",
 auth: {
    user: "lucianoyabra@gmail.com", // Cambialo por tu email
    pass: "Sashita9" // Cambialo por tu password
 },
 tls: {
    rejectUnauthorized: false
}
 });



const mailOptions = {
 from: `”${formulario.nombre} ” <${formulario.email}>`,
 to: "luchoyabra@hotmail.com", // Cambia esta parte por el destinatario
 subject: formulario.asunto,
 html: `
 <strong>Nombre:</strong> ${formulario.nombre} <br/>
 <strong>E-mail:</strong> ${formulario.email} <br/>
 <strong>Mensaje:</strong> ${formulario.mensaje}
 `
 };
transporter.sendMail(mailOptions, function (err, info) {
 if (err){
 console.log('ahi va el error: ' +err)
 }else{
 console.log('ahi va el NO error: ' +info);
 }
});
}
