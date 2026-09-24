const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    // ================= PROJECT INFO =================

    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      minlength: [2, "Project title must be at least 2 characters"],
      maxlength: [150, "Project title cannot exceed 150 characters"],
    },

    slug: {
      type: String,
      required: [true, "Project slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [2, "Project slug must be at least 2 characters"],
      maxlength: [160, "Project slug cannot exceed 160 characters"],
    },

    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      minlength: [10, "Short description must be at least 10 characters"],
      maxlength: [300, "Short description cannot exceed 300 characters"],
    },

    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      minlength: [20, "Project description must be at least 20 characters"],
      maxlength: [3000, "Project description cannot exceed 3000 characters"],
    },

    // ================= IMAGES =================

    featuredImage: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Featured image path cannot exceed 500 characters"],
    },

    gallery: {
      type: [
        {
          type: String,
          trim: true,
          maxlength: [500, "Gallery image path cannot exceed 500 characters"],
        },
      ],
      default: [],
    },

    // ================= CATEGORY =================

    category: {
      type: String,
      required: [true, "Project category is required"],
      trim: true,
      minlength: [2, "Project category must be at least 2 characters"],
      maxlength: [100, "Project category cannot exceed 100 characters"],
    },

    // ================= TECHNOLOGIES =================

    technologies: {
      type: [
        {
          type: String,
          trim: true,
          maxlength: [100, "Technology name cannot exceed 100 characters"],
        },
      ],
      default: [],
    },

    // ================= CLIENT =================

    client: {
      type: String,
      default: "",
      trim: true,
      maxlength: [150, "Client name cannot exceed 150 characters"],
    },

    // ================= PROJECT LINKS =================

    projectUrl: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Project URL cannot exceed 500 characters"],
    },

    githubUrl: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "GitHub URL cannot exceed 500 characters"],
    },

    // ================= COMPLETION DATE =================

    completionDate: {
      type: Date,
      default: null,
    },

    // ================= STATUS =================

    status: {
      type: String,
      enum: {
        values: ["draft", "published"],
        message: "Status must be either draft or published",
      },
      default: "draft",
    },

    // ================= FEATURED =================

    isFeatured: {
      type: Boolean,
      default: false,
    },

    // ================= DISPLAY ORDER =================

    displayOrder: {
      type: Number,
      default: 0,
      min: [0, "Display order cannot be negative"],
    },

    // ================= CREATED BY =================

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by user is required"],
    },
  },
  {
    timestamps: true,
  }
);

// ================= INDEXES =================

// Public portfolio listing
portfolioSchema.index({
  status: 1,
  displayOrder: 1,
});

// Featured published portfolios
portfolioSchema.index({
  status: 1,
  isFeatured: 1,
  displayOrder: 1,
});

// Category filtering
portfolioSchema.index({
  category: 1,
});

// Admin-created portfolios
portfolioSchema.index({
  createdBy: 1,
});

// ================= MODEL =================

const Portfolio = mongoose.model(
  "Portfolio",
  portfolioSchema
);

module.exports = Portfolio;