const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

router
  .route("/")
  .get(clientController.getAllClients)

router
  .route("/:clientId")
  .get(clientController.getClient)

module.exports = router;