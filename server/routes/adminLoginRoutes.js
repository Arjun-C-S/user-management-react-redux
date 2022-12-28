const express = require("express");

const adminLoginController = require("../controller/adminLoginController");

const router = express.Router();

router.post("/login", adminLoginController.adminLoginPost);

module.exports = router;
