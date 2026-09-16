const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    // ==================================================
    // CLIENT INFO
    // ==================================================

    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
      minlength: [2, "Client name must be at least 2 characters"],
      maxlength: [100, "Client name cannot exceed 100 characters"],
    },

    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
      minlength: [2, "Designation must be at least 2 characters"],
      maxlength: [100, "Designation cannot exceed 100 characters"],
    },

    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      minlength: [2, "Company name must be at least 2 characters"],
      maxlength: [150, "Company name cannot exceed 150 characters"],
    },

    profileImage: {
      type: String,
      default: "",
      trim: true,
    },

    // ==================================================
    // RATING
    // ==================================================

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },

    // ==================================================
    // TESTIMONIAL MESSAGE
    // ==================================================

    message: {
      type: String,
      required: [true, "Testimonial message is required"],
      trim: true,
      minlength: [
        10,
        "Testimonial message must be at least 10 characters",
      ],
      maxlength: [
        1000,
        "Testimonial message cannot exceed 1000 characters",
      ],
    },

    // ==================================================
    // STATUS
    // ==================================================

    status: {
      type: String,
      enum: {
        values: ["draft", "published"],
        message: "Status must be either draft or published",
      },
      default: "draft",
      index: true,
    },

    // ==================================================
    // FEATURED
    // ==================================================

    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },

    // ==================================================
    // DISPLAY ORDER
    // ==================================================

    displayOrder: {
      type: Number,
      default: 0,
      min: [0, "Display order cannot be negative"],
    },

    // ==================================================
    // CREATED BY
    // ==================================================

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by user is required"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// ==================================================
// COMPOUND INDEXES
// ==================================================

testimonialSchema.index({
  status: 1,
  displayOrder: 1,
});

testimonialSchema.index({
  status: 1,
  isFeatured: 1,
});

// ==================================================
// MODEL
// ==================================================

const Testimonial = mongoose.model(
  "Testimonial",
  testimonialSchema
);

module.exports = Testimonial;