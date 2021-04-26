const express = require("express");
// const requestIp = require('request-ip');
const HttpError = require("../models/http-error");
const FormModel = require("../models/form-model");
const { validationResult } = require("express-validator");
const { testMail } = require("./sendmail-controller.js");

const filledForm = async (req, res, next) => {
  // console.log("\nfilledForm");
  // Check for errors:
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors);
    const error = new HttpError("Invalid inputs, please check your data", 422);
    return next(error);
  }

  // get Form body:
  const {
    name,
    email,
    gender,
    IPv4,
    country,
    city,
    state,
    creationDate,
    windowW,
    windowH,
  } = req.body;

  let newForm;
  try {
    newForm = new FormModel({
      name,
      email,
      gender,
      IPv4,
      country,
      city,
      state,
      creationDate,
      windowPixels: [windowW, windowH],
    });
    await newForm.save();
    await testMail(newForm.name, newForm.email);
  } catch (err) {
    const error = new HttpError("Error al guardar el tramite.", 422);
    await res.status(500).json({ theError: err });
    return next(error);
  }
  await res.status(200).json({ message: "ok!" });
};

const getDataForms = async (req, res, next) => {
  // Check for errors:
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors);
    const error = new HttpError("Invalid inputs, please check your data", 422);
    return next(error);
  }
  let allPeople;
  try {
    allPeople = await FormModel.find();
  } catch (err) {
    const error = new HttpError(
      "Error al consultar los datos. Intentalo de nuevo",
      422
    );
    res.status(500).json({ theError: err });
    return next(error);
  }
  await res.status(200).json({ data: allPeople });
};

exports.filledForm = filledForm;
exports.getDataForms = getDataForms;
