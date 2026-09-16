const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    // ================= BASIC INFORMATION =================

    fullName: {
      type: String,
      required: [true, "Full Name is required"],
      trim: true,
      minlength: [2, "Full Name must be at least 2 characters"],
      maxlength: [100, "Full Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: [150, "Email cannot exceed 150 characters"],
    },

    phone: {
      type: String,
      trim: true,
      default: "",
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },

    // ================= MESSAGE =================

    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      minlength: [3, "Subject must be at least 3 characters"],
      maxlength: [200, "Subject cannot exceed 200 characters"],
    },

    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters"],
      maxlength: [5000, "Message cannot exceed 5000 characters"],
    },

    // ================= ADMIN =================

    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },

    adminNotes: {
      type: String,
      trim: true,
      default: "",
      maxlength: [2000, "Admin notes cannot exceed 2000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);