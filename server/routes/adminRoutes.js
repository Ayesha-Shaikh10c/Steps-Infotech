const express = require("express");

const router = express.Router();

// ==================================================
// MIDDLEWARE
// ==================================================

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// ==================================================
// ADMIN CONTROLLER
// ==================================================

const {
  getAllUsers,
  getUserById,
  adminUpdateUser,
  approveUser,
  rejectUser,
  blockUser,
  unblockUser,
  deleteUser,
} = require("../controllers/adminController");

// ==================================================
// ALL ADMIN USER ROUTES
// ==================================================

// GET /api/admin/users
router.get("/users", protect, adminOnly, getAllUsers);

// GET /api/admin/users/:id
router.get("/users/:id", protect, adminOnly, getUserById);

// PUT /api/admin/users/:id
router.put("/users/:id", protect, adminOnly, adminUpdateUser);

// PUT /api/admin/users/:id/approve
router.put("/users/:id/approve", protect, adminOnly, approveUser);

// PUT /api/admin/users/:id/reject
router.put("/users/:id/reject", protect, adminOnly, rejectUser);

// PUT /api/admin/users/:id/block
router.put("/users/:id/block", protect, adminOnly, blockUser);

// PUT /api/admin/users/:id/unblock
router.put("/users/:id/unblock", protect, adminOnly, unblockUser);

// DELETE /api/admin/users/:id
router.delete("/users/:id", protect, adminOnly, deleteUser);

// ==================================================
// EXPORT ROUTER
// ==================================================

module.exports = router;