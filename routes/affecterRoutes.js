const express = require("express");
const router = express.Router();
const AffecterController = require("../controllers/affecterController");

router
  .route("/")
  .get(AffecterController.getAllAffectations)
  .post(AffecterController.createAffectation)

router
  .route("/:affectationId")
  .get(AffecterController.getAffectation)
  .delete(AffecterController.deleteAffectation)
  .patch(AffecterController.updateAffectation);

router
  .route("/getAffectationsTicket/:IDTicket")
  .get(AffecterController.getAffectationsTicket);

router
  .route("/getAffectationsIntervenant/:IDintervenant")
  .get(AffecterController.getAffectationsIntervenant);

router
  .route("/getAffectationsIntervenantTicket/:IDTicket/:IDintervenant")
  .get(AffecterController.getAffectationsIntervenantTicket);

module.exports = router;
