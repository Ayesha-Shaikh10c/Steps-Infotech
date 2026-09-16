const mongoose = require("mongoose");

const technologySchema = new mongoose.Schema(
  {
    // ================= BASIC INFORMATION =================

    name: {
      type: String,
      required: [true, "Technology name is required"],
      trim: true,
      minlength: [2, "Technology name must be at least 2 characters"],
      maxlength: [100, "Technology name cannot exceed 100 characters"],
      unique: true,
    },

    slug: {
      type: String,
      required: [true, "Technology slug is required"],
      trim: true,
      lowercase: true,
      maxlength: [120, "Technology slug cannot exceed 120 characters"],
      unique: true,
    },

    description: {
      type: String,
      required: [true, "Technology description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
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

    // ================= CATEGORY =================

    category: {
      type: String,
      required: [true, "Technology category is required"],
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
      default: "published",
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

// Technology search by category
technologySchema.index({
  category: 1,
});

// Public technologies
technologySchema.index({
  status: 1,
  displayOrder: 1,
});

// Featured published technologies
technologySchema.index({
  status: 1,
  isFeatured: 1,
  displayOrder: 1,
});

// Technologies created by admin
technologySchema.index({
  createdBy: 1,
});

// ================= MODEL =================

const Technology = mongoose.model(
  "Technology",
  technologySchema
);

module.exports = Technology;