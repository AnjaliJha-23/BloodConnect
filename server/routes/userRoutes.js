const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  findDonors,
} = require("../controllers/userController");

router.get("/profile",auth,getProfile);

router.put("/profile",auth,updateProfile);

router.get("/find", findDonors);

module.exports = router;