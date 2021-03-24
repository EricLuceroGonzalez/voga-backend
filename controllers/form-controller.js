const express = require("express");
// const requestIp = require('request-ip');
const HttpError = require("../models/http-error");
const FormModel = require("../models/form-model");
const { validationResult } = require("express-validator");

const filledForm = async (req, res, next) => {
  console.log("filledForm");
  // Check for errors:
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError("Invalid inputs, please check your data", 422);
    return next(error);
  }

  // get Form body:
  const {
    name,
    email,
    phone,
    IPv4,
    country,
    city,
    state,
    lat,
    lon,
    creationDate,
    windowPixels,
  } = req.body;

  let newForm;
  try {
    newForm = new FormModel({
      name,
      email,
      phone,
      IPv4,
      country,
      city,
      state,
      lat,
      lon,
      creationDate,
      windowPixels,
    });
    await newForm.save();
    res.status(200).json({ message: "ok!" });
  } catch (err) {
    const error = new HttpError("Error al guardar el tramite.", 422);
    res.status(500).json({ theError: err, data: newForm });
    return next(error);
  }
};

exports.filledForm = filledForm;
