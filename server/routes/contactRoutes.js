const express = require("express");
const router = express.Router();
const { sendMessage, getContactMessages } = require("../controllers/contactController");

// Public route to submit contact form
router.post("/", sendMessage);

// Admin route to fetch all contact submissions
router.get("/", getContactMessages);

module.exports = router;