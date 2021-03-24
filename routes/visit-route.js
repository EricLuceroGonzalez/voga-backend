const express = require("express");

const router = express.Router();
// import controller
const visitController = require("../controllers/visit-controller");

router.post("/visitAdd", visitController.addVisit);
router.post("/visitCreate/", visitController.createVisitDb);
router.get("/visitGet", visitController.getAllVisits);

module.exports = router;
