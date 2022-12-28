const express = require("express");

const profileController = require("../controller/profileController");

const { protect } = require("../middleware/jwtauth");

const router = express.Router();

router.get("/profile", protect,profileController.profileGet);

router.post("/profile", profileController.profilePost);

module.exports = router;
