const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");

const {
  getDashboardStats,
  getAllUsers,
  getAllRequests,
  updateRequestStatus,
  getAnalytics,
  toggleUserStatus,
  deleteUser,
  deleteRequest,
  completeRequest,
} = require("../controllers/adminController");

router.get("/dashboard", protect, isAdmin, getDashboardStats);
router.get("/users", protect, isAdmin, getAllUsers);
router.get("/requests", protect, isAdmin, getAllRequests);
router.put("/requests/:id/status", protect, isAdmin, updateRequestStatus);
router.get("/analytics", protect, isAdmin, getAnalytics);
router.put("/users/:id/status", protect, isAdmin, toggleUserStatus);
router.delete("/users/:id", protect, isAdmin, deleteUser);
router.delete("/requests/:id", protect, isAdmin, deleteRequest);
router.put("/requests/:id/complete", protect, isAdmin, completeRequest);

module.exports = router;