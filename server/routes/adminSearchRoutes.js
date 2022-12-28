const express = require("express");

const adminSearchController = require("../controller/adminSearchController");

const router = express.Router();

// router.get("/search", adminSearchController.adminSearchGet);

router.post("/search", adminSearchController.adminSearchPost);

module.exports = router;
