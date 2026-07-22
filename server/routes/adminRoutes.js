const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const isAdmin = require("../middleware/adminMiddleware");

const {
  getDashboardStats,
  getAllUsers,
} = require("../controllers/adminController");

router.get("/dashboard", protect, isAdmin, getDashboardStats);
router.get("/users", protect, isAdmin, getAllUsers);

module.exports = router;
