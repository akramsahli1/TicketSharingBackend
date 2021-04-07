const express = require("express");
const router = express.Router();
const mailing = require("../controllers/mailing");

router
  .route("/")
  .post(mailing.Mailer)


module.exports = router;