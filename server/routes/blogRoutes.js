const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createBlog,
  getBlogs,
  getBlogBySlug,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// ==================================================
// PUBLIC ROUTES
// ==================================================

// Get Published Blogs
// GET /api/blogs
router.get("/", getBlogs);

// Get Published Blog By Slug
// GET /api/blogs/slug/:slug
router.get("/slug/:slug", getBlogBySlug);

// ==================================================
// ADMIN ROUTES
// ==================================================

// Create Blog
// POST /api/blogs/admin
router.post(
  "/admin",
  protect,
  adminOnly,
  createBlog
);

// Get All Blogs
// GET /api/blogs/admin/all
router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllBlogs
);

// Get Blog By ID
// GET /api/blogs/admin/:id
router.get(
  "/admin/:id",
  protect,
  adminOnly,
  getBlogById
);

// Update Blog
// PUT /api/blogs/admin/:id
router.put(
  "/admin/:id",
  protect,
  adminOnly,
  updateBlog
);

// Delete Blog
// DELETE /api/blogs/admin/:id
router.delete(
  "/admin/:id",
  protect,
  adminOnly,
  deleteBlog
);

module.exports = router;