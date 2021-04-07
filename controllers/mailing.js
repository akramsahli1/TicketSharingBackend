const nodemailer = require('nodemailer');

////mailing
const Mailer = async (req,res)=>{
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORDEM,
        },
      secure: false,
    }); 
    let mailOptions ={
      from:'sharingticket@gmail.com',
      to:req.body.to,
      subject:req.body.sub,
      text:req.body.text
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if(err){
        console.log(err);}  
        res.status(200).send({message: "main send"});
    });  
  };
  
  
  module.exports = {
    Mailer
  };