const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    // ================= BASIC DETAILS =================

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    department: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    internshipType: {
      type: String,
      enum: [
        "Full Time",
        "Part Time",
        "Remote",
        "Hybrid",
      ],
      default: "Full Time",
    },

    duration: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    stipend: {
      type: String,
      default: "Unpaid",
      trim: true,
      maxlength: 100,
    },

    // ================= DESCRIPTION =================

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10000,
    },

    responsibilities: [
      {
        type: String,
        trim: true,
        maxlength: 500,
      },
    ],

    requirements: [
      {
        type: String,
        trim: true,
        maxlength: 500,
      },
    ],

    skills: [
      {
        type: String,
        trim: true,
        maxlength: 100,
      },
    ],

    // ================= INTERNSHIP INFO =================

    openings: {
      type: Number,
      default: 1,
      min: 1,
      max: 10000,
    },

    applicationDeadline: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "open", "closed"],
      default: "draft",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    // ================= ADMIN =================

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// ================= INDEXES =================

internshipSchema.index({
  status: 1,
  applicationDeadline: 1,
  createdAt: -1,
});

internshipSchema.index({
  isFeatured: -1,
  createdAt: -1,
});

internshipSchema.index({
  department: 1,
  status: 1,
});

module.exports = mongoose.model(
  "Internship",
  internshipSchema
);