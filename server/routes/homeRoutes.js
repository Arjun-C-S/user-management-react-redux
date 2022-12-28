const express = require("express");

const homeController = require("../controller/homeController");

const { protect } = require("../middleware/jwtauth");

const router = express.Router();

router.get("/home", protect,homeController.homeGet);


module.exports = router;
