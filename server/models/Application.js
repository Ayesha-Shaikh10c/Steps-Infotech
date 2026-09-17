const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    // ================= USER =================

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // ================= JOB =================

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPosting",
      required: true,
      index: true,
    },

    // ================= APPLICATION DETAILS =================

    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 150,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    resume: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    coverLetter: {
      type: String,
      default: "",
      trim: true,
      maxlength: 5000,
    },

    skills: [
      {
        type: String,
        trim: true,
        maxlength: 100,
      },
    ],

    experience: {
      type: String,
      default: "Fresher",
      trim: true,
      maxlength: 100,
    },

    // ================= APPLICATION STATUS =================

    status: {
      type: String,
      enum: [
        "pending",
        "shortlisted",
        "interview",
        "rejected",
        "hired",
      ],
      default: "pending",
      index: true,
    },

    // ================= ADMIN NOTES =================

    adminNotes: {
      type: String,
      default: "",
      trim: true,
      maxlength: 5000,
    },

    interviewDate: {
      type: Date,
      default: null,
    },

    // ================= APPLIED DATE =================

    appliedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// ==================================================
// INDEXES
// ==================================================

// Prevent the same user from applying multiple times
// for the same job.
applicationSchema.index(
  {
    applicant: 1,
    job: 1,
  },
  {
    unique: true,
    name: "unique_user_job_application",
  }
);

// User's application history
applicationSchema.index({
  applicant: 1,
  createdAt: -1,
});

// Admin filtering by application status
applicationSchema.index({
  status: 1,
  createdAt: -1,
});

// Job-wise application management
applicationSchema.index({
  job: 1,
  status: 1,
  createdAt: -1,
});

module.exports = mongoose.model(
  "Application",
  applicationSchema
);