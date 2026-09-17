const express = require("express");

const router = express.Router();

// ==================================================
// MIDDLEWARE
// ==================================================

const protect = require("../middleware/authMiddleware");

const {
  profileUpload,
  resumeUpload,
} = require("../middleware/uploadMiddleware");

// ==================================================
// USER CONTROLLER
// ==================================================

const {
  getProfile,
  updateOwnProfile,
  changePassword,
  uploadProfileImage,
  uploadResume,
} = require("../controllers/userController");

// ==================================================
// USER PROFILE
// ==================================================

// GET /api/users/profile
router.get(
  "/profile",
  protect,
  getProfile
);

// PUT /api/users/profile
router.put(
  "/profile",
  protect,
  updateOwnProfile
);

// ==================================================
// PASSWORD
// ==================================================

// PUT /api/users/change-password
router.put(
  "/change-password",
  protect,
  changePassword
);

// ==================================================
// PROFILE IMAGE
// ==================================================

// PUT /api/users/upload-profile
router.put(
  "/upload-profile",
  protect,
  profileUpload.single("profileImage"),
  uploadProfileImage
);

// ==================================================
// RESUME
// ==================================================

// PUT /api/users/upload-resume
router.put(
  "/upload-resume",
  protect,
  resumeUpload.single("resume"),
  uploadResume
);

// ==================================================
// EXPORT
// ==================================================

module.exports = router;