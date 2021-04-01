const express = require("express");
// Nodemailer init:
const nodemailer = require("nodemailer");
const HttpError = require("../models/http-error");

var transporter = nodemailer.createTransport({
  service: "gmail",
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
    subject: `Hola. ${userTo}, te mando mi material exclusivo 😈`, // Subject line
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
              box-shadow: 0 14px 6px -6px grey;
            ">
        <div>Hola, <b>${userTo}</b>, que xopa.</div>
        <div style="margin-top: 80px">
            Mensaje del correo de agradecimiento
    
        </div>
        <div style="text-align: center; margin: 90px auto 0px auto">
            <img width="240px" alt="danny duran logo art" src="https://res.cloudinary.com/dcvnw6hvt/image/upload/v1617084235/danny/danny_logo_iv6s5b.png" />
        </div>
    </div>`,
  });
};

exports.testMail = testMail;
