const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

router.post("/signupMembS", authController.signup_postMembS);
router.post("/loginMembS",authController.login_postMembS);
router.post("/signupClient", authController.signup_postClient);
router.post("/loginClient",authController.login_postClient);
module.exports = router;
