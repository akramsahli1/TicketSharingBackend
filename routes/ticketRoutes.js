const express = require("express");
const ticketController = require("../controllers/ticketController");
const router = express.Router();
const Filtre=require('../middleware/FiltreTicket');


router
  .route("/")
  .post(ticketController.createTicket)

router  
  .route("/getAll")
  .post(Filtre,ticketController.getAllTickets)  

router
  .route("/:ticketId")
  .get(ticketController.getTicket)
  .delete(ticketController.deleteTicket)
  .patch(ticketController.updateTicket);

router
  .route("/image/:ticketId")
  .get(ticketController.getImage)
router
  .route("/getInterventionsClient/:IDclient")
  .get(ticketController.getTicketsClient)


  router
  .route("/getInterventionsContrat/:contrat")
  .get(ticketController.getTicketsContrat)  
module.exports = router;
 
