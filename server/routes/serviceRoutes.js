const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createService,
  getPublishedServices,
  getServiceBySlug,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

// ==================================================
// PUBLIC ROUTES
// ==================================================

// Get all published services
// GET /api/services
router.get("/", getPublishedServices);

// Get published service by slug
// GET /api/services/slug/:slug
router.get("/slug/:slug", getServiceBySlug);

// ==================================================
// ADMIN ROUTES
// ==================================================

// Create service
// POST /api/services/admin
router.post("/admin", protect, adminOnly, createService);

// Get all services
// GET /api/services/admin/all
router.get("/admin/all", protect, adminOnly, getAllServices);

// Get service by ID
// GET /api/services/admin/:id
router.get("/admin/:id", protect, adminOnly, getServiceById);

// Update service
// PUT /api/services/admin/:id
router.put("/admin/:id", protect, adminOnly, updateService);

// Delete service
// DELETE /api/services/admin/:id
router.delete("/admin/:id", protect, adminOnly, deleteService);

module.exports = router;