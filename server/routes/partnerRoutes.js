const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createPartner,
  getPublishedPartners,
  getPartnerBySlug,
  getAllPartners,
  getPartnerById,
  updatePartner,
  deletePartner,
} = require("../controllers/partnerController");

// ==================================================
// PUBLIC ROUTES
// ==================================================

// Get published partners
// GET /api/partners
router.get("/", getPublishedPartners);

// Get published partner by slug
// GET /api/partners/slug/:slug
router.get("/slug/:slug", getPartnerBySlug);

// ==================================================
// ADMIN ROUTES
// ==================================================

// Create partner
// POST /api/partners/admin
router.post(
  "/admin",
  protect,
  adminOnly,
  createPartner
);

// Get all partners
// GET /api/partners/admin/all
router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllPartners
);

// Get partner by ID
// GET /api/partners/admin/:id
router.get(
  "/admin/:id",
  protect,
  adminOnly,
  getPartnerById
);

// Update partner
// PUT /api/partners/admin/:id
router.put(
  "/admin/:id",
  protect,
  adminOnly,
  updatePartner
);

// Delete partner
// DELETE /api/partners/admin/:id
router.delete(
  "/admin/:id",
  protect,
  adminOnly,
  deletePartner
);

module.exports = router;