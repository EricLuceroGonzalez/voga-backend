const express = require("express");
// const requestIp = require('request-ip');
const HttpError = require("../models/http-error");
const FormModel = require("../models/form-model");
var useragent = require("useragent");
const { validationResult } = require("express-validator");

const filledForm = async (req, res, next) => {
  // console.log("\nfilledForm");
  // Check for errors:
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors);
    const error = new HttpError("Invalid inputs, please check your data", 422);
    return next(error);
  }
  let brow;
  let oSyst;
  // Get the headers
  // if (errors.isEmpty()) {
  try {
    var agent = useragent.parse(req.headers["user-agent"]);
    var agentInfo = agent.toString(); // 'Chrome 15.0.874 / Mac OS X 10.8.1'
    brow = agentInfo.split(" /")[0].split(" ")[0];
    oSyst = agentInfo.split("/")[1].split(" ")[1];
  } catch (err) {
    const error = new HttpError("Cant check the user agents", 422);
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

  try {
    let newForm;
    newForm = new FormModel({
      name,
      email,
      gender,
      IPv4,
      country,
      city,
      state,
      creationDate,
      device: {
        windowPixels: [windowW, windowH],
        browser: brow ? brow : "NaN",
        oSystem: oSyst ? oSyst : "NaN",
      },
    });
    await newForm.save();
    // await testMail(newForm.name, newForm.email);
    console.log(newForm);
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
