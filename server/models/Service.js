const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    // ================= BASIC INFO =================

    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      minlength: [3, "Service title must be at least 3 characters"],
      maxlength: [150, "Service title cannot exceed 150 characters"],
    },

    slug: {
      type: String,
      required: [true, "Service slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, "Service slug must be at least 3 characters"],
      maxlength: [160, "Service slug cannot exceed 160 characters"],
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
      required: [true, "Service description is required"],
      trim: true,
      minlength: [20, "Service description must be at least 20 characters"],
      maxlength: [5000, "Service description cannot exceed 5000 characters"],
    },

    // ================= MEDIA =================

    icon: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Icon path cannot exceed 500 characters"],
    },

    image: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Image path cannot exceed 500 characters"],
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

    // ================= FEATURES =================

    features: {
      type: [
        {
          type: String,
          trim: true,
          minlength: [2, "Feature must be at least 2 characters"],
          maxlength: [200, "Feature cannot exceed 200 characters"],
        },
      ],
      default: [],
    },

    // ================= CATEGORY =================

    category: {
      type: String,
      required: [true, "Service category is required"],
      trim: true,
      minlength: [2, "Category must be at least 2 characters"],
      maxlength: [100, "Category cannot exceed 100 characters"],
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

// Public services ordered by display order
serviceSchema.index({
  status: 1,
  displayOrder: 1,
});

// Featured services
serviceSchema.index({
  status: 1,
  isFeatured: 1,
  displayOrder: 1,
});

// Category filtering
serviceSchema.index({
  category: 1,
});

// Services created by admin
serviceSchema.index({
  createdBy: 1,
});

// ================= MODEL =================

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;