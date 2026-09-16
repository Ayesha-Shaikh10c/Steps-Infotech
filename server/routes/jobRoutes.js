const express = require("express");

const router = express.Router();

// ==================================================
// MIDDLEWARE
// ==================================================

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// ==================================================
// JOB CONTROLLER
// ==================================================

const {
  createJob,
  getAllJobs,
  getOpenJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

// ==================================================
// ADMIN ROUTES
// ==================================================

// POST /api/jobs/admin
router.post(
  "/admin",
  protect,
  adminOnly,
  createJob
);

// GET /api/jobs/admin/all
router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllJobs
);

// PUT /api/jobs/admin/:id
router.put(
  "/admin/:id",
  protect,
  adminOnly,
  updateJob
);

// DELETE /api/jobs/admin/:id
router.delete(
  "/admin/:id",
  protect,
  adminOnly,
  deleteJob
);

// ==================================================
// PUBLIC ROUTES
// ==================================================

// GET /api/jobs
router.get(
  "/",
  getOpenJobs
);

// GET /api/jobs/:id
router.get(
  "/:id",
  getJobById
);

// ==================================================
// EXPORT
// ==================================================

module.exports = router;