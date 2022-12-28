const express = require("express");

const signupController = require("../controller/signupController");

const router = express.Router();

router.get("/signup", signupController.signUpGet);

router.post("/signup", signupController.signUpPost);

module.exports = router;
