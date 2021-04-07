const express = require("express");

const router = express.Router();
// import controller
const userCtrl = require("../controllers/user-controller");

router.post("/signupUser", userCtrl.signup);
router.post("/loginUser", userCtrl.login);
module.exports = router;
