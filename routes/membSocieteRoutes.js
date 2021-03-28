const express = require("express");
const router = express.Router();
const membSocieteController = require("../controllers/membSocieteController");

router
  .route("/")
  .get(membSocieteController.getAllMembSocietes)

router
  .route("/:membSocieteId")
  .get(membSocieteController.getMembSociete)

module.exports = router;
