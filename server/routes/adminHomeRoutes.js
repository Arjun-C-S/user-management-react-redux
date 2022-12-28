const express = require("express");

const adminhomeController = require("../controller/adminHomeController");

const { protect } = require("../middleware/jwtauth");

const router = express.Router();

router.get("/home", protect, adminhomeController.adminHomeGet);

router.post("/home", adminhomeController.adminHomePost);

router.get("/block-user", adminhomeController.adminUserBlock);

module.exports = router;
