const express = require("express");
const interventionController = require("../controllers/interventionController");
const router = express.Router();

router
  .route("/")
  .post(interventionController.createIntervention)
  .get(interventionController.getAllInterventions)

router
  .route("/:interventionId")
  .get(interventionController.getIntervention)
  .delete(interventionController.deleteIntervention)
  .patch(interventionController.updateIntervention);

router
  .route("/getInterventionsClient/:IDclient")
  .get(interventionController.getInterventionsClient)

router
  .route("/getInterventionsIntervenant/:IDintervenant")
  .get(interventionController.getInterventionsIntervenant)

module.exports = router;
