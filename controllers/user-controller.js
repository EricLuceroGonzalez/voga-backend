const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const User = require("../models/user-model");

// @route POST api/users/register
// @desc Register user
// @access Public
const signup = async (req, res, next) => {
  // console.log("\nbackend register");
  //  console.log(req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //  console.log(errors);

    const error = new HttpError(
      "Los valores introducidos no son validos. Intenta de nuevo",
      422
    );
    return next(error);
  }
  const { name, password, password2 } = req.body;

  if (password !== password2) {
    const error = new HttpError("Las contraseñas no coinciden.", 500);
    return next(error);
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ name: name });
  } catch (err) {
    const error = new HttpError(
      "Ocurrió un error al verificar el correo, inténtalo de nuevo.",
      500
    );
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError(
      "Ya hay un usuario registrado con este correo. Por favor, inicia sesión.",
      422
    );
    return next(error);
  }

  // With bycrpt we HASH the password from incoming request:
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Hubo un error al encriptar la contraseña, por favor inténtalo de nuevo.",
      500
    );
    return next(error);
  }

  // Create user:
  const createdUser = new User({
    name,
    password: hashedPassword,
  });

  //   Create USER ---> save() to Mongo, as async => await
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "No pudimos crear el usuario, por favor inténtalo de nuevo",
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser._id, name: createdUser.name },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "El usuario ha sido creado, sin embargo hay un problema con tu navegador.",
      500
    );
    return next(error);
  }
  res.status(201).json({
    name: createdUser.name,
    userId: createdUser.id,
    token: token,
  });
};

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
const login = async (req, res, next) => {
  // console.log(`\n login`);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Los valores introducidos no son validos. Intenta de nuevo",
      422
    );
    return next(error);
  }

  const { name, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ name: name });
  } catch (err) {
    const error = new HttpError(
      "Ha ocurrido un error, por favor intentalo de nuevo",
      403
    );
    return next(error);
  }

  //   CHECK IF EMAIL IS CORRECT (dummy version)
  if (!existingUser) {
    const error = new HttpError(
      "No pudimos encontrar este usuario, por favor regístrate",
      403
    );
    return next(error);
  }

  // Check the password, compare to the encrypted and give a token
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "No pudimos verificar tus datos, por favor inténtalo de nuevo.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "La contraseña no es válida, por favor inténtalo de nuevo.",
      403
    );
    return next(error);
  }
  console.log(existingUser);

  // generate TOKEN
  let token;
  try {
    const payload = {
      id: existingUser._id,
      name: existingUser.name,
    };
    token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "12h" });
  } catch (err) {
    const error = new HttpError(
      "Hubo un error en el registro, por favor inténtalo de nuevo.",
      500
    );
    return next(error);
  }

  res.status(201).json({
    name: existingUser.name.name,
    userId: existingUser._id,
    token: token,
  });
};
exports.signup = signup;
exports.login = login;

// TODO: Password change/recover
// TODO: Logout
