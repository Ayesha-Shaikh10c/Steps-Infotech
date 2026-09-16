const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    // ================= PARTNER INFO =================

    name: {
      type: String,
      required: [true, "Partner name is required"],
      trim: true,
      minlength: [2, "Partner name must be at least 2 characters"],
      maxlength: [150, "Partner name cannot exceed 150 characters"],
    },

    slug: {
      type: String,
      required: [true, "Partner slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [2, "Partner slug must be at least 2 characters"],
      maxlength: [160, "Partner slug cannot exceed 160 characters"],
    },

    // ================= MEDIA =================

    logo: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Logo path cannot exceed 500 characters"],
    },

    // ================= DESCRIPTION =================

    description: {
      type: String,
      required: [true, "Partner description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    // ================= WEBSITE =================

    website: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Website URL cannot exceed 500 characters"],
    },

    // ================= CATEGORY =================

    category: {
      type: String,
      required: [true, "Partner category is required"],
      trim: true,
      minlength: [2, "Category must be at least 2 characters"],
      maxlength: [100, "Category cannot exceed 100 characters"],
    },

    // ================= STATUS =================

    status: {
      type: String,
      enum: {
        values: ["draft", "published", "archived"],
        message: "Invalid partner status",
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

// Public partner listing
partnerSchema.index({
  status: 1,
  displayOrder: 1,
});

// Featured published partners
partnerSchema.index({
  status: 1,
  isFeatured: 1,
  displayOrder: 1,
});

// Category filtering
partnerSchema.index({
  category: 1,
});

// Admin-created partners
partnerSchema.index({
  createdBy: 1,
});

// ================= MODEL =================

const Partner = mongoose.model(
  "Partner",
  partnerSchema
);

module.exports = Partner;