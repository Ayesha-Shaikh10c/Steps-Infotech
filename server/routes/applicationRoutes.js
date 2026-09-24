const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  applyForJob,
  getMyApplications,
  getMyApplicationById,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} = require("../controllers/applicationController");

// ==================================================
// USER ROUTES
// ==================================================

// Apply for a job
// POST /api/applications
router.post("/", protect, applyForJob);

// Get logged-in user's applications
// GET /api/applications/my
router.get("/my", protect, getMyApplications);

// Get logged-in user's single application
// GET /api/applications/my/:id
router.get("/my/:id", protect, getMyApplicationById);

// ==================================================
// ADMIN ROUTES
// ==================================================

// Get all applications
// GET /api/applications/admin/all
router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllApplications
);

// Get single application
// GET /api/applications/admin/:id
router.get(
  "/admin/:id",
  protect,
  adminOnly,
  getApplicationById
);

// Update application status
// PUT /api/applications/admin/:id/status
router.put(
  "/admin/:id/status",
  protect,
  adminOnly,
  updateApplicationStatus
);

// Delete application
// DELETE /api/applications/admin/:id
router.delete(
  "/admin/:id",
  protect,
  adminOnly,
  deleteApplication
);

module.exports = router;