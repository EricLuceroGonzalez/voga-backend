const express = require("express");
// Nodemailer init:
const nodemailer = require("nodemailer");
const HttpError = require("../models/http-error");

// bh8928.banahosting.com

const testMail = async (user, email) => {
  var transporter = await nodemailer.createTransport({
    name: "dannyduranmusic.com",
    host: "mail.dannyduranmusic.com",
    port: "465",
    auth: {
      user: process.env.mailUser,
      pass: process.env.mailPas,
    },
  });

  // var transporter = nodemailer.createTransport({
  //   host: "smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: "323f43fd5599c6",
  //     pass: "bf296b73b4ffbf",
  //   },
  // });
  await transporter.sendMail({
    from: `Danny Duran Music<${process.env.mailUser}>`, // sender address
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
        href:
          "https://www.dannyduranmusic.com/media_assets/Danny_Duran_ft_Alkilados_Misterio.mp3",
      },
      // {
      //   filename: "Danny_Duran_ft_Alkilados_-_Misterio.mp3",
      //   href:
      //     "https://res.cloudinary.com/dcvnw6hvt/video/upload/v1618976607/danny/Tema%20nuevo/Danny_Duran_ft_Alkilados_-_Misterio_h3ykjr.mp3",
      // },
    ],
  });
};

exports.testMail = testMail;
