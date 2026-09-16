const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    // ================= BASIC INFO =================

    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      minlength: 3,
      maxlength: 200,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    excerpt: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    content: {
      type: String,
      required: [true, "Blog content is required"],
      trim: true,
    },

    // ================= IMAGE =================

    featuredImage: {
      type: String,
      default: "",
      trim: true,
    },

    // ================= CATEGORY =================

    category: {
      type: String,
      required: [true, "Blog category is required"],
      trim: true,
    },

    // ================= TAGS =================

    tags: {
      type: [String],
      default: [],
    },

    // ================= AUTHOR =================

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ================= STATUS =================

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    // ================= FEATURED =================

    isFeatured: {
      type: Boolean,
      default: false,
    },

    // ================= PUBLISH DATE =================

    publishedAt: {
      type: Date,
      default: null,
    },

    // ================= VIEWS =================

    views: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// ================= INDEXES =================


blogSchema.index({ status: 1 });
blogSchema.index({ category: 1 });
blogSchema.index({ publishedAt: -1 });
blogSchema.index({ isFeatured: 1 });

// ================= MODEL =================

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;