const mongoose = require("mongoose");
const Application = require("../models/Application");
const JobPosting = require("../models/JobPosting");

// ==================================================
// HELPERS
// ==================================================

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const getPagination = (query) => {
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(
    Math.max(Number.parseInt(query.limit, 10) || 20, 1),
    100
  );

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
};

const cleanString = (value, maxLength = 5000) => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
};

const cleanStringArray = (value, maxItems = 50) => {
  if (!Array.isArray(value)) return [];

  return [
    ...new Set(
      value
        .filter((item) => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => item.slice(0, 100))
    ),
  ].slice(0, maxItems);
};

const allowedStatuses = [
  "pending",
  "shortlisted",
  "interview",
  "rejected",
  "hired",
];

// ==================================================
// APPLY FOR JOB
// ==================================================

const applyForJob = async (req, res) => {
  try {
    const {
      jobId,
      coverLetter,
      skills,
      experience,
    } = req.body || {};

    // ================= VALIDATE JOB ID =================

    if (!jobId || !isValidObjectId(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Valid Job ID is required.",
      });
    }

    // ================= AUTHENTICATION =================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // ================= FIND JOB =================

    const job = await JobPosting.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    // ================= CHECK JOB STATUS =================

    if (job.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "This job is not accepting applications.",
      });
    }

    // ================= CHECK DEADLINE =================

    if (
      job.applicationDeadline &&
      new Date() > new Date(job.applicationDeadline)
    ) {
      return res.status(400).json({
        success: false,
        message: "Application deadline has passed.",
      });
    }

    // ================= CHECK RESUME =================

    if (!req.user.resume) {
      return res.status(400).json({
        success: false,
        message: "Please upload your resume before applying.",
      });
    }

    // ================= VALIDATE INPUT =================

    if (
      coverLetter !== undefined &&
      typeof coverLetter !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Cover letter must be valid text.",
      });
    }

    if (
      experience !== undefined &&
      typeof experience !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Experience must be valid text.",
      });
    }

    if (
      skills !== undefined &&
      !Array.isArray(skills)
    ) {
      return res.status(400).json({
        success: false,
        message: "Skills must be an array.",
      });
    }

    const cleanedCoverLetter = cleanString(
      coverLetter || "",
      5000
    );

    const cleanedExperience = cleanString(
      experience || "Fresher",
      200
    );

    const cleanedSkills =
      skills !== undefined
        ? cleanStringArray(skills)
        : cleanStringArray(req.user.skills);

    // ================= CHECK DUPLICATE =================

    const existingApplication = await Application.findOne({
      applicant: req.user._id,
      job: job._id,
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    // ================= CREATE APPLICATION =================

    const application = await Application.create({
      applicant: req.user._id,
      job: job._id,

      fullName: req.user.fullName,
      email: req.user.email,
      phone: req.user.phone || "",

      resume: req.user.resume,

      coverLetter: cleanedCoverLetter,

      skills: cleanedSkills,

      experience: cleanedExperience,

      status: "pending",
    });

    // ================= RESPONSE =================

    return res.status(201).json({
      success: true,
      message: "Job application submitted successfully.",
      application: {
        _id: application._id,
        job: application.job,
        fullName: application.fullName,
        email: application.email,
        status: application.status,
        appliedAt: application.appliedAt,
      },
    });
  } catch (error) {
    console.error("❌ Apply For Job Error:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    // MongoDB unique index protection
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to submit application.",
    });
  }
};

// ==================================================
// GET MY APPLICATIONS
// ==================================================

const getMyApplications = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const { page, limit, skip } = getPagination(req.query);

    const filter = {
      applicant: req.user._id,
    };

    const [applications, total] = await Promise.all([
      Application.find(filter)
        .select(
          "-adminNotes"
        )
        .populate(
          "job",
          "title department location employmentType status applicationDeadline"
        )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Application.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      count: applications.length,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      applications,
    });
  } catch (error) {
    console.error("❌ Get My Applications Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to load your applications.",
    });
  }
};

// ==================================================
// GET SINGLE MY APPLICATION
// ==================================================

const getMyApplicationById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID.",
      });
    }

    const application = await Application.findOne({
      _id: req.params.id,
      applicant: req.user._id,
    })
      .select("-adminNotes")
      .populate(
        "job",
        "title department location employmentType status applicationDeadline"
      )
      .lean();

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("❌ Get My Application Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to load application.",
    });
  }
};

// ==================================================
// ADMIN - GET ALL APPLICATIONS
// ==================================================

const getAllApplications = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);

    const [applications, total] = await Promise.all([
      Application.find()
        .populate(
          "applicant",
          "fullName email phone profileImage resume skills"
        )
        .populate(
          "job",
          "title department location employmentType status"
        )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Application.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      count: applications.length,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      applications,
    });
  } catch (error) {
    console.error("❌ Get All Applications Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to load applications.",
    });
  }
};

// ==================================================
// ADMIN - GET APPLICATION BY ID
// ==================================================

const getApplicationById = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID.",
      });
    }

    const application = await Application.findById(req.params.id)
      .populate(
        "applicant",
        "fullName email phone profileImage resume skills"
      )
      .populate(
        "job",
        "title department location employmentType status applicationDeadline"
      )
      .lean();

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("❌ Get Application By ID Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to load application.",
    });
  }
};

// ==================================================
// ADMIN - UPDATE APPLICATION STATUS
// ==================================================

const updateApplicationStatus = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID.",
      });
    }

    const {
      status,
      adminNotes,
      interviewDate,
    } = req.body || {};

    // ================= VALIDATE STATUS =================

    if (
      typeof status !== "string" ||
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status.",
      });
    }

    // ================= VALIDATE NOTES =================

    if (
      adminNotes !== undefined &&
      typeof adminNotes !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Admin notes must be valid text.",
      });
    }

    if (
      typeof adminNotes === "string" &&
      adminNotes.length > 5000
    ) {
      return res.status(400).json({
        success: false,
        message: "Admin notes cannot exceed 5000 characters.",
      });
    }

    // ================= VALIDATE INTERVIEW DATE =================

    let cleanedInterviewDate = null;

    if (
      interviewDate !== undefined &&
      interviewDate !== null &&
      interviewDate !== ""
    ) {
      const parsedDate = new Date(interviewDate);

      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid interview date.",
        });
      }

      cleanedInterviewDate = parsedDate;
    }

    // ================= FIND APPLICATION =================

    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    // ================= UPDATE =================

    application.status = status;

    if (adminNotes !== undefined) {
      application.adminNotes = cleanString(
        adminNotes,
        5000
      );
    }

    if (interviewDate !== undefined) {
      application.interviewDate = cleanedInterviewDate;
    }

    const updatedApplication =
      await application.save();

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully.",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("❌ Update Application Status Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to update application status.",
    });
  }
};

// ==================================================
// ADMIN - DELETE APPLICATION
// ==================================================

const deleteApplication = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID.",
      });
    }

    const application = await Application.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    await Application.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Application deleted successfully.",
    });
  } catch (error) {
    console.error("❌ Delete Application Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to delete application.",
    });
  }
};

// ==================================================
// EXPORTS
// ==================================================

module.exports = {
  applyForJob,
  getMyApplications,
  getMyApplicationById,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
};