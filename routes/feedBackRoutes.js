const express = require("express");
const feedBackController = require("../controllers/feedBackController");
const router = express.Router();



router
  .route("/")
  .post(feedBackController.createFeedBack)

router
  .route("/:feedBackId")
  .patch(feedBackController.updateFeedBackTicket);


router
  .route("/getFeedBackTicket/:ticketId")
  .get(feedBackController.getFeedBackTicket)


module.exports = router;
 
