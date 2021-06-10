const express = require("express");
const statistiqueController = require("../controllers/statistiqueController");
const router = express.Router();
const Filtre=require('../middleware/Stat');


router
  .route("/")
  .post(Filtre,statistiqueController.stasticAllTicket)

  router
  .route("/add")
  .post(statistiqueController.createTicket)
  router
  .route("/addi")
  .post(statistiqueController.createAff)

  router
  .route("/temps")
  .post(statistiqueController.stasticTempsTickets)
  router
  .route("/client")
  .post(statistiqueController.stasticTicketPie)
module.exports = router;
 
