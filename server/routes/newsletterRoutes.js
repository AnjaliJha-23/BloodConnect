const express = require("express");

const {
  subscribeNewsletter,
  getSubscribers,
} = require("../controllers/newsletterController");

const router = express.Router();

router.post("/subscribe", subscribeNewsletter);

router.get("/subscribers", getSubscribers);

module.exports = router;