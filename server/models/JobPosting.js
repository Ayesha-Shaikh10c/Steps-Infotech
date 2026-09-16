const mongoose = require("mongoose");

const jobPostingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      enum: [
        "Full Time",
        "Part Time",
        "Internship",
        "Contract",
        "Remote",
      ],
      required: true,
    },

    experience: {
      type: String,
      default: "Fresher",
      trim: true,
    },

    salary: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    responsibilities: [
      {
        type: String,
        trim: true,
      },
    ],

    requirements: [
      {
        type: String,
        trim: true,
      },
    ],

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    openings: {
      type: Number,
      default: 1,
      min: 1,
    },

    applicationDeadline: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["open", "closed", "draft"],
      default: "open",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("JobPosting", jobPostingSchema);