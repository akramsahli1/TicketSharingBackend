const express = require("express");
const ticketController = require("../controllers/ticketController");
const router = express.Router();

router
  .route("/")
  .post(ticketController.createTicket)
  .get(ticketController.getAllTickets)

router
  .route("/:ticketId")
  .get(ticketController.getTicket)
  .delete(ticketController.deleteTicket)
  .patch(ticketController.updateTicket);

router
  .route("/getTicketsClient/:client")
  .get(ticketController.getTicketsClient)

router
  .route("/getTicketsIntervenant/:intervenant")
  .get(ticketController.getTicketsIntervenant)

module.exports = router;
