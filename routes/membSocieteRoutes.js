const express = require("express");
const router = express.Router();
const membSocieteController = require("../controllers/membSocieteController");
const auth=require('../middleware/Auth');
router
  .route("/")
  .get(membSocieteController.getAllMembSocietes)

router
  .route("/connect")
  .get(auth,membSocieteController.getMembSocieteConnecte)
     
router
  .route("/:membSocieteId")
  .get(membSocieteController.getMembSociete)
  .delete(membSocieteController.deleteMembSociete)
  .patch(membSocieteController.updateMembSociete);

router
  .route("/updateMotDePasse/:membSocieteId")
  .patch(membSocieteController.updateMotDePasseMembSociete);
router
  .route("/getMembSocietesRole/:role")
  .get(membSocieteController.getMembSocieteRole);

module.exports = router;
