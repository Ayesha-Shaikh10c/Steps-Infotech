const mongoose = require("mongoose");

const savedJobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPosting",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ek user same job ko duplicate save nahi kar sakta
savedJobSchema.index(
  { user: 1, job: 1 },
  {
    unique: true,
    name: "unique_saved_job",
  }
);

// User ke saved jobs latest first
savedJobSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("SavedJob", savedJobSchema);