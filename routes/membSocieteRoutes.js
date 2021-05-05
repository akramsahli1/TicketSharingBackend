const express = require("express");
const router = express.Router();
const membSocieteController = require("../controllers/membSocieteController");

router
  .route("/")
  .get(membSocieteController.getAllMembSocietes)

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
