const express = require("express");
const rapportInterController = require("../controllers/rapportInterController");
const router = express.Router();

router
  .route("/")
  .post(rapportInterController.createRapportInter)
  .get(rapportInterController.getAllRapportInters)

router
  .route("/:ticketId")
  .get(rapportInterController.getRapportInter)
  .delete(rapportInterController.deleteRapportInter)
  .patch(rapportInterController.updateRapportInter);

router
  .route("/getRapportIntersIntervenant/:intervenant")
  .get(rapportInterController.getRapportIntersIntervenant)

module.exports = router;
