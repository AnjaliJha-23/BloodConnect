const express = require("express");
const router = express.Router();

// Destructure the exact exported function name
const { searchDonors } = require("../controllers/donorControllers");

// Line 9: This will now receive a valid function instead of undefined
router.get("/search", searchDonors);

module.exports = router;