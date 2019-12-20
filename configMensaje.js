const nodemailer = require("nodemailer");

module.exports = (formulario) => {
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
           user: 'lucianoyabra@gmail.com',
           pass: 'Sashita9'
       }
   });


 const mailOptions = {
  from: 'lyrswebdesign@gmail.com', // sender address
  to: 'lucianoyabra@gmail.com', // list of receivers
  subject: 'Subject of your email', // Subject line
  html: '<p>Your html here</p>'// plain text body
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
