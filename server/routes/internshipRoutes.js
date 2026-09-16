const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createInternship,
  getOpenInternships,
  getInternshipById,
  getAllInternships,
  updateInternship,
  deleteInternship,
} = require("../controllers/internshipController");

// ==================================================
// PUBLIC ROUTES
// ==================================================

// Get all open internships
// GET /api/internships
router.get("/", getOpenInternships);

// ==================================================
// ADMIN ROUTES
// ==================================================

// Create internship
// POST /api/internships/admin
router.post(
  "/admin",
  protect,
  adminOnly,
  createInternship
);

// Get all internships
// GET /api/internships/admin/all
router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllInternships
);

// Update internship
// PUT /api/internships/admin/:id
router.put(
  "/admin/:id",
  protect,
  adminOnly,
  updateInternship
);

// Delete internship
// DELETE /api/internships/admin/:id
router.delete(
  "/admin/:id",
  protect,
  adminOnly,
  deleteInternship
);

// ==================================================
// PUBLIC SINGLE INTERNSHIP
// ==================================================

// Get single open internship
// GET /api/internships/:id
router.get("/:id", getInternshipById);

module.exports = router;