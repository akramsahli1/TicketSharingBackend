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



module.exports = router;
