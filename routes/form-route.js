const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
// import controller
const formController = require("../controllers/form-controller");

// TODO: Check if email has dot or special character
router.post(
  "/send",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail({ gmail_remove_dots: false }).isEmail(),
  ],
  formController.filledForm
);
router.get("/getPeople", formController.getDataForms);
module.exports = router;
