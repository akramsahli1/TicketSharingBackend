const express = require("express");
const ticketController = require("../controllers/ticketController");
const router = express.Router();
const Filtre=require('../middleware/FiltreTicket');
const ticketMiddle=require('../middleware/Ticket');



router
  .route("/")
  .post(ticketMiddle.createRef,ticketController.createTicket)

router  
  .route("/getAll")
  .post(Filtre.filtreIntervenant,ticketController.getAllTickets)  

router
  .route("/:ticketId")
  .get(ticketController.getTicket)
  .delete(ticketMiddle.deleteTicket,ticketController.deleteTicket)
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
 
