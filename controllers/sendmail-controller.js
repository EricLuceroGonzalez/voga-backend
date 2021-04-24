const express = require("express");
// Nodemailer init:
const nodemailer = require("nodemailer");
const HttpError = require("../models/http-error");

var transporter = nodemailer.createTransport({
  host: "mail.dannyduranmusic.com",
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

  transporter.sendMail({
    from: process.env.mailUser, // sender address
    to: email, // list of receivers/
    subject: `${
      user.split(" ")[0] ? "Hola 🐯" + user.split(" ")[0] : "Hola 🐯"
    } Te mando mi material exclusivo`, // Subject line
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
        // use URL as an attachment
        filename: "Danny_Duran_ft_Alkilados_-_Misterio.mp3",
        path:
          "https://bh8928.banahosting.com:2083/cpsess5999520071/frontend/paper_lantern/filemanager/showfile.html?file=Danny+Duran+ft+Alkilados+-+Misterio.mp3&fileop=&dir=%2Fhome%2Fofzcmvde%2Fmedia_assets&dirop=&charset=&file_charset=&baseurl=&basedir=",
        // path: "https://res.cloudinary.com/dcvnw6hvt/video/upload/v1618976607/danny/Tema%20nuevo/Danny_Duran_ft_Alkilados_-_Misterio_h3ykjr.mp3",
      },
    ],
  });
};

exports.testMail = testMail;
