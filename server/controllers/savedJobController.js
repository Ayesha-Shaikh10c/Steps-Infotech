const mongoose = require("mongoose");

const SavedJob = require("../models/SavedJob");
const JobPosting = require("../models/JobPosting");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// @desc    Save a job
// @route   POST /api/saved-jobs/:jobId
// @access  Private
const saveJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!isValidObjectId(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID.",
      });
    }

    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const job = await JobPosting.findOne({
      _id: jobId,
      status: "open",
    }).select("_id");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or is no longer available.",
      });
    }

    const existingSavedJob = await SavedJob.findOne({
      user: req.user._id,
      job: jobId,
    }).select("_id");

    if (existingSavedJob) {
      return res.status(409).json({
        success: false,
        message: "Job is already saved.",
      });
    }

    const savedJob = await SavedJob.create({
      user: req.user._id,
      job: jobId,
    });

    return res.status(201).json({
      success: true,
      message: "Job saved successfully.",
      data: savedJob,
    });
  } catch (error) {
    console.error("❌ Save Job Error:", {
      name: error.name,
      message: error.message,
    });

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Job is already saved.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to save job.",
    });
  }
};

// @desc    Get user's saved jobs
// @route   GET /api/saved-jobs
// @access  Private
const getSavedJobs = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const savedJobs = await SavedJob.find({
      user: req.user._id,
    })
      .populate({
        path: "job",
        select:
          "title department location employmentType experience salary openings applicationDeadline status isFeatured createdAt",
      })
      .sort({ createdAt: -1 })
      .lean();

    const availableJobs = savedJobs.filter(
      (savedJob) => savedJob.job && savedJob.job.status === "open"
    );

    return res.status(200).json({
      success: true,
      count: availableJobs.length,
      data: availableJobs,
    });
  } catch (error) {
    console.error("❌ Get Saved Jobs Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to fetch saved jobs.",
    });
  }
};

// @desc    Check whether a job is saved
// @route   GET /api/saved-jobs/:jobId/check
// @access  Private
const checkSavedJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!isValidObjectId(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID.",
      });
    }

    const savedJob = await SavedJob.exists({
      user: req.user._id,
      job: jobId,
    });

    return res.status(200).json({
      success: true,
      saved: Boolean(savedJob),
    });
  } catch (error) {
    console.error("❌ Check Saved Job Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to check saved job.",
    });
  }
};

// @desc    Remove saved job
// @route   DELETE /api/saved-jobs/:jobId
// @access  Private
const removeSavedJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!isValidObjectId(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID.",
      });
    }

    const deletedJob = await SavedJob.findOneAndDelete({
      user: req.user._id,
      job: jobId,
    });

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Saved job not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job removed from saved jobs.",
    });
  } catch (error) {
    console.error("❌ Remove Saved Job Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to remove saved job.",
    });
  }
};

module.exports = {
  saveJob,
  getSavedJobs,
  checkSavedJob,
  removeSavedJob,
};