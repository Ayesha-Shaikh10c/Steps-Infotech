const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getUserDashboard,
  getAdminDashboard,
} = require("../controllers/dashboardController");

// User Dashboard
router.get("/user", protect, getUserDashboard);

// Admin Dashboard
router.get("/admin", protect, adminOnly, getAdminDashboard);

module.exports = router;