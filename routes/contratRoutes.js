const express = require("express");
const router = express.Router();
const ContratController = require("../controllers/contratController");

router
  .route("/")
  .get(ContratController.getAllContrats)
  .post(ContratController.createContrat)

router
  .route("/:contratId")
  .get(ContratController.getContrat)
  .delete(ContratController.deleteContrat)
  .patch(ContratController.updateContrat);

router
  .route("/getContratsClient/:IDclient")
  .get(ContratController.getContratsClient);

module.exports = router;
