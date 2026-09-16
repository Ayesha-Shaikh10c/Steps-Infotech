const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createPortfolio,
  getPublishedPortfolios,
  getPortfolioBySlug,
  getAllPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");

// ==================================================
// PUBLIC ROUTES
// ==================================================

// Get all published portfolios
// GET /api/portfolio
router.get("/", getPublishedPortfolios);

// ==================================================
// ADMIN ROUTES
// ==================================================

// Create portfolio
// POST /api/portfolio/admin
router.post(
  "/admin",
  protect,
  adminOnly,
  createPortfolio
);

// Get all portfolios
// GET /api/portfolio/admin/all
router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllPortfolios
);

// Get portfolio by ID
// GET /api/portfolio/admin/:id
router.get(
  "/admin/:id",
  protect,
  adminOnly,
  getPortfolioById
);

// Update portfolio
// PUT /api/portfolio/admin/:id
router.put(
  "/admin/:id",
  protect,
  adminOnly,
  updatePortfolio
);

// Delete portfolio
// DELETE /api/portfolio/admin/:id
router.delete(
  "/admin/:id",
  protect,
  adminOnly,
  deletePortfolio
);

// ==================================================
// PUBLIC SINGLE PORTFOLIO
// ==================================================

// Get published portfolio by slug
// GET /api/portfolio/:slug
//
// Keep this route LAST because :slug is dynamic.
router.get("/:slug", getPortfolioBySlug);

module.exports = router;