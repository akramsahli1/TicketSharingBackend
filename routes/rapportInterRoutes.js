const express = require("express");
const rapportInterController = require("../controllers/rapportInterController");
const router = express.Router();


router
  .route("/")
  .post(rapportInterController.createRapportInter)

router  
  .route("/getAll")
  .post(rapportInterController.getAllRapportInters)  

router
  .route("/:rapportInterId")
  .get(rapportInterController.getRapportInter)
  .delete(rapportInterController.deleteRapportInter)
  .patch(rapportInterController.updateRapportInter);

router
  .route("/attachement/:rapportInterId")
  .get(rapportInterController.getAttachement)
router
  .route("/getRapportIntersTicket/:IDTicket")
  .get(rapportInterController.getRapportIntersTicket)

router
  .route("/getRapportIntersIntervenant/:IDintervenant")
  .get(rapportInterController.getRapportIntersIntervenant)

module.exports = router;
 
