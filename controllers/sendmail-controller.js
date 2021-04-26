const express = require("express");
// Nodemailer init:
const nodemailer = require("nodemailer");
const HttpError = require("../models/http-error");

var transporter = nodemailer.createTransport({
  host: "bh8928.banahosting.com",
  port: "587",
  auth: {
    user: process.env.mailUser,
    pass: process.env.mailPas,
  },
});
const testMail = async (user, email) => {
  //   console.log("testMail");
  //   let userTo;
  //   try {
  let userTo = await user.split(" ")[0];
  //   console.log(userTo);

  //   } catch (error) {
  // console.log(error);
  //   }

  await transporter.sendMail({
    from: process.env.mailUser, // sender address
    to: email, // list of receivers/
    subject: `Te mando mi material exclusivo`, // Subject line
    html: `<div style="
    max-width: 89%;
    margin: 80px auto;
    background-color: #000000;
    border: none;
    font-size: 1.25em;
    font-weight: 700;
    padding: 2rem 2rem;
    color: #ffffff;
    font-family: 'Montserrat', sans-serif;
    box-shadow: 14px 9px 16px grey;
  ">
    <div style="margin-top: 80px; text-align: center;">
        <p>REVISA EL ADJUNTO</p>
        <p>PARA DESCARGAR</p>
    </div>
    <div style="text-align: center; margin: 90px auto 0px auto">
        <img width="290px" 
        alt="danny duran logo DD" 
        src="https://res.cloudinary.com/dcvnw6hvt/image/upload/v1617084235/danny/danny_logo_iv6s5b.png" />
    </div>
</div>`,
    attachments: [
      {
        filename: "Danny_Duran_ft_Alkilados_-_Misterio.mp3",
        path:
          "http://www.dannyduranmusic.com/media_assets/Danny_Duran_ft_Alkilados_Misterio.mp3",
      },
    ],
  });
};

exports.testMail = testMail;
