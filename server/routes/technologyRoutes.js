const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createTechnology,
  getPublishedTechnologies,
  getTechnologyBySlug,
  getAllTechnologies,
  getTechnologyById,
  updateTechnology,
  deleteTechnology,
} = require("../controllers/technologyController");

// ==================================================
// PUBLIC ROUTES
// ==================================================

// Get Published Technologies
// GET /api/technologies
router.get("/", getPublishedTechnologies);

// Get Published Technology By Slug
// GET /api/technologies/slug/:slug
router.get("/slug/:slug", getTechnologyBySlug);

// ==================================================
// ADMIN ROUTES
// ==================================================

// Create Technology
// POST /api/technologies/admin
router.post(
  "/admin",
  protect,
  adminOnly,
  createTechnology
);

// Get All Technologies
// GET /api/technologies/admin/all
router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllTechnologies
);

// Get Technology By ID
// GET /api/technologies/admin/:id
router.get(
  "/admin/:id",
  protect,
  adminOnly,
  getTechnologyById
);

// Update Technology
// PUT /api/technologies/admin/:id
router.put(
  "/admin/:id",
  protect,
  adminOnly,
  updateTechnology
);

// Delete Technology
// DELETE /api/technologies/admin/:id
router.delete(
  "/admin/:id",
  protect,
  adminOnly,
  deleteTechnology
);

module.exports = router;