const express = require("express");

const router = express.Router();
// import controller
const formController = require("../controllers/form-controller");

router.post("/send", formController.filledForm);

module.exports = router;
