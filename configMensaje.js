const nodemailer = require("nodemailer");

module.exports = (formulario) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'youremail@address.com',
           pass: 'yourpassword'
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
