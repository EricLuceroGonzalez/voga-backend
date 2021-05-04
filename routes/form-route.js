const express = require("express");

const router = express.Router();
// import controller
const formController = require("../controllers/form-controller");

// TODO: Check if email has dot or special character
router.post("/send", formController.filledForm);
router.get("/getPeople", formController.getDataForms);
module.exports = router;
