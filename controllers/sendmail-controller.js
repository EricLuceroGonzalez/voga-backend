const express = require("express");
// Nodemailer init:
const nodemailer = require("nodemailer");
const HttpError = require("../models/http-error");

const testMail = (user, email) => {

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.mailUser,
      pass: process.env.mailPas,
    },
  });

  transporter.sendMail({
    from: `Kooky Music<${process.env.mailUser}>`, // sender address
    to: `${email}`, // list of receivers/
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
        alt="Artist logo DD" 
        src="https://res.cloudinary.com/dcvnw6hvt/image/upload/v1626381372/voga/kooky/logo-kooky_nb2h1c.png" />
    </div>
</div>`,
    // attachments: [
    //   {
    //     filename: "Danny_Duran_ft_Alkilados_-_Misterio.mp3",
    //     href:
    //       "https://www.dannyduranmusic.com/media_assets/Danny_Duran_ft_Alkilados_Misterio.mp3",
    //   },
    // ],
  });
};

exports.testMail = testMail;
