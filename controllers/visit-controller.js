const express = require("express");
// const requestIp = require('request-ip');
const HttpError = require("../models/http-error");
const VisitModel = require("../models/visit-model");
const { validationResult } = require("express-validator");

const createVisitDb = async (req, res, next) => {
  console.log("createVisitDb");
  let visit = new VisitModel();
  await visit.save();
  // let finder = VisitModel.findOne()
  //   console.log(finder);

  //   let visitToCreate = VisitModel.findById("5f76375f8bdbe637387484ae");
  try {
    await visit.save({});
    // await visitToCreate.updateOne({ $push: { date: new Date() } });
    // await visitToCreate.updateOne({ $inc: { counter: 1 } });
    // await visitToCreate.date.push('aaa')
    res.status(200).json({
      message: "It's ok",
      //   ipAddres: ip,
    });
  } catch (err) {
    const error = new HttpError("Ocurrió un error al contar la visita.", 500);
    return next(error);
  }
};

const getAllVisits = async (req, res, next) => {
  // Check for errors:
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError("Invalid inputs, please check your data", 422);
    return next(error);
  }

  let allVisits;
  try {
    allVisits = await VisitModel.find();
    res.status(200).json({ message: "ok!", data: allVisits });
  } catch (err) {
    const error = new HttpError("Ocurrió un error al contar la visita.", 500);
    return next(error);
  }
};

const addVisit = async (req, res, next) => {
  console.log(`\n\n addVisit --> ${Date.now()}`);
//   const clientIp = requestIp.getClientIp(req);
  // Check for errors:
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError("Invalid inputs, please check your data", 422);
    return next(error);
  }
  const ipInfo = req.body.ipValue
  console.log(ipInfo);

  try {
    await VisitModel.findOneAndUpdate(
      { _id: "6059668911a243521436227a" },
      {
        $push: {
          date: new Date(),
          ipAddress: ipInfo.IPv4,
        },

        $inc: { counter: 1 },
      },
      { new: true }
    );
    res.status(200).json({
      message: "It's ok",
    });
  } catch (err) {
    const error = new HttpError("Ocurrió un error al contar la visita.", 500);
    return next(error);
  }
};

exports.addVisit = addVisit;
exports.createVisitDb = createVisitDb;
exports.getAllVisits = getAllVisits;
