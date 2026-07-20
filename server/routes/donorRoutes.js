const express = require("express");

const router = express.Router();

const {
    findDonors
} = require("../controllers/donorControllers");

router.get("/search", findDonors);

module.exports = router;