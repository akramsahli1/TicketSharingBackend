const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const auth=require('../middleware/Auth');
const ticketMiddleware=require('../middleware/Ticket');

router
  .route("/")
  .get(clientController.getAllClients)
  
  router
  .route("/connect")
  .get(auth,clientController.getClientConnecte)
   
router
  .route("/:clientId")
  .get(clientController.getClient)
  .delete(ticketMiddleware.deleteTicketCl,clientController.deleteClient)
  .patch(clientController.updateClient);
  
router
  .route("/updateMotDePasse/:clientId")
  .patch(clientController.updateMotDePasseClient)

module.exports = router;