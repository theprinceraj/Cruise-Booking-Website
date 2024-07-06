const express = require("express");
const router = express.Router();
const auth_controller = require("../controllers/auth_controller");

router.route("/signup").post(auth_controller.signup);
router.route("/login").post(auth_controller.login);

module.exports = router;