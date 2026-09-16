const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  saveJob,
  getSavedJobs,
  checkSavedJob,
  removeSavedJob,
} = require("../controllers/savedJobController");

// Get all saved jobs
router.get("/", protect, getSavedJobs);

// Check if a specific job is saved
router.get("/:jobId/check", protect, checkSavedJob);

// Save a job
router.post("/:jobId", protect, saveJob);

// Remove a saved job
router.delete("/:jobId", protect, removeSavedJob);

module.exports = router;