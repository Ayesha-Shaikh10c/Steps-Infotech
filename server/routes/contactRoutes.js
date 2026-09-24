const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

// ==================================================
// PUBLIC ROUTES
// ==================================================

// Submit Contact Form
// POST /api/contacts
router.post("/", createContact);

// ==================================================
// ADMIN ROUTES
// ==================================================

// Get All Contact Messages
// GET /api/contacts/admin/all
router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllContacts
);

// Get Contact By ID
// GET /api/contacts/admin/:id
router.get(
  "/admin/:id",
  protect,
  adminOnly,
  getContactById
);

// Update Contact
// PUT /api/contacts/admin/:id
router.put(
  "/admin/:id",
  protect,
  adminOnly,
  updateContact
);

// Delete Contact
// DELETE /api/contacts/admin/:id
router.delete(
  "/admin/:id",
  protect,
  adminOnly,
  deleteContact
);

module.exports = router;