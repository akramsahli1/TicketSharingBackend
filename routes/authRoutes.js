const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();
const auth=require('../middleware/Auth')

router.post("/signupMembS", authController.signup_postMembS);
router.post("/loginMembS",authController.login_postMembS);
router.post("/signupClient", authController.signup_postClient);
router.post("/loginClient",authController.login_postClient);
router.get("/reflesh",auth,authController.refleshToken);

module.exports = router;
