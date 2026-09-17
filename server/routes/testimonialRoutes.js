const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createTestimonial,
  getPublishedTestimonials,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

// ==================================================
// PUBLIC ROUTES
// ==================================================

// Get Published Testimonials
// GET /api/testimonials
router.get("/", getPublishedTestimonials);

// ==================================================
// ADMIN ROUTES
// ==================================================

// Create Testimonial
// POST /api/testimonials/admin
router.post(
  "/admin",
  protect,
  adminOnly,
  createTestimonial
);

// Get All Testimonials
// GET /api/testimonials/admin/all
router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllTestimonials
);

// Get Testimonial By ID
// GET /api/testimonials/admin/:id
router.get(
  "/admin/:id",
  protect,
  adminOnly,
  getTestimonialById
);

// Update Testimonial
// PUT /api/testimonials/admin/:id
router.put(
  "/admin/:id",
  protect,
  adminOnly,
  updateTestimonial
);

// Delete Testimonial
// DELETE /api/testimonials/admin/:id
router.delete(
  "/admin/:id",
  protect,
  adminOnly,
  deleteTestimonial
);

module.exports = router;