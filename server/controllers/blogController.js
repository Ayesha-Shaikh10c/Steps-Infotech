const mongoose = require("mongoose");
const slugify = require("slugify");

const Blog = require("../models/Blog");

// ==================================================
// CONSTANTS
// ==================================================

const allowedStatuses = ["draft", "published"];

// ==================================================
// HELPERS
// ==================================================

const isValidObjectId = (id) =>
  mongoose.Types.ObjectId.isValid(id);

const cleanString = (value, maxLength = 10000) => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
};

const parseBoolean = (value, defaultValue = false) => {
  if (value === undefined || value === null) {
    return defaultValue;
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    if (normalized === "true") return true;
    if (normalized === "false") return false;
  }

  return defaultValue;
};

const parsePublishedDate = (value) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

const cleanTags = (tags) => {
  if (!Array.isArray(tags)) {
    return [];
  }

  return [
    ...new Set(
      tags
        .filter(
          (tag) =>
            typeof tag === "string" ||
            typeof tag === "number"
        )
        .map((tag) =>
          String(tag).trim().toLowerCase()
        )
        .filter(Boolean)
        .map((tag) => tag.slice(0, 50))
    ),
  ].slice(0, 30);
};

const createSlug = (title) => {
  return slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });
};

const getPagination = (req) => {
  const page = Math.max(
    parseInt(req.query.page, 10) || 1,
    1
  );

  const limit = Math.min(
    Math.max(
      parseInt(req.query.limit, 10) || 10,
      1
    ),
    100
  );

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
};

// ==================================================
// ADMIN - CREATE BLOG
// ==================================================

const createBlog = async (req, res) => {
  try {
    const body = req.body || {};

    const title = cleanString(body.title, 200);
    const excerpt = cleanString(body.excerpt, 500);
    const content = cleanString(body.content, 500);
    const category = cleanString(body.category, 100);
    const featuredImage = cleanString(
      body.featuredImage,
      1000
    );

    // ================= REQUIRED FIELDS =================

    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message:
          "Title, content and category are required.",
      });
    }

    if (title.length < 3) {
      return res.status(400).json({
        success: false,
        message:
          "Blog title must be at least 3 characters.",
      });
    }

    if (content.length < 1) {
      return res.status(400).json({
        success: false,
        message:
          "Blog content cannot be empty.",
      });
    }

    // ================= SLUG =================

    const slug = createSlug(title);

    if (!slug) {
      return res.status(400).json({
        success: false,
        message:
          "Unable to generate a valid blog slug.",
      });
    }

    // ================= CHECK SLUG =================

    const existingBlog = await Blog.findOne({
      slug,
    }).select("_id");

    if (existingBlog) {
      return res.status(409).json({
        success: false,
        message:
          "A blog with this title already exists.",
      });
    }

    // ================= STATUS =================

    const blogStatus =
      body.status === undefined
        ? "draft"
        : body.status;

    if (!allowedStatuses.includes(blogStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog status.",
      });
    }

    // ================= TAGS =================

    if (
      body.tags !== undefined &&
      !Array.isArray(body.tags)
    ) {
      return res.status(400).json({
        success: false,
        message: "Tags must be an array.",
      });
    }

    const blogTags = cleanTags(body.tags);

    // ================= PUBLISHED DATE =================

    let finalPublishedAt = null;

    if (blogStatus === "published") {
      if (body.publishedAt) {
        finalPublishedAt =
          parsePublishedDate(
            body.publishedAt
          );

        if (!finalPublishedAt) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid published date.",
          });
        }
      } else {
        finalPublishedAt = new Date();
      }
    }

    // ================= AUTHOR =================

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required.",
      });
    }

    // ================= CREATE =================

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      tags: blogTags,
      author: req.user._id,
      status: blogStatus,
      isFeatured: parseBoolean(
        body.isFeatured,
        false
      ),
      publishedAt: finalPublishedAt,
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully.",
      blog,
    });
  } catch (error) {
    console.error(
      "❌ Create Blog Error:",
      error
    );

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A blog with this title already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create blog.",
    });
  }
};

// ==================================================
// PUBLIC - GET PUBLISHED BLOGS
// ==================================================

const getBlogs = async (req, res) => {
  try {
    const {
      page,
      limit,
      skip,
    } = getPagination(req);

    const filter = {
      status: "published",
      publishedAt: {
        $ne: null,
        $lte: new Date(),
      },
    };

    const [blogs, total] =
      await Promise.all([
        Blog.find(filter)
          .populate(
            "author",
            "fullName profileImage"
          )
          .sort({
            isFeatured: -1,
            publishedAt: -1,
          })
          .skip(skip)
          .limit(limit)
          .lean(),

        Blog.countDocuments(filter),
      ]);

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages:
          Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(
      "❌ Get Blogs Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to fetch blogs.",
    });
  }
};

// ==================================================
// PUBLIC - GET BLOG BY SLUG
// ==================================================

const getBlogBySlug = async (req, res) => {
  try {
    const slug = cleanString(
      req.params.slug,
      250
    ).toLowerCase();

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog slug.",
      });
    }

    const blog = await Blog.findOne({
      slug,
      status: "published",
      publishedAt: {
        $ne: null,
        $lte: new Date(),
      },
    })
      .populate(
        "author",
        "fullName profileImage"
      )
      .lean();

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    // ================= INCREASE VIEWS =================

    await Blog.updateOne(
      { _id: blog._id },
      { $inc: { views: 1 } }
    );

    blog.views = (blog.views || 0) + 1;

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error(
      "❌ Get Blog By Slug Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to fetch blog.",
    });
  }
};

// ==================================================
// ADMIN - GET ALL BLOGS
// ==================================================

const getAllBlogs = async (req, res) => {
  try {
    const {
      page,
      limit,
      skip,
    } = getPagination(req);

    const [blogs, total] =
      await Promise.all([
        Blog.find()
          .populate(
            "author",
            "fullName email profileImage"
          )
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit)
          .lean(),

        Blog.countDocuments(),
      ]);

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages:
          Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(
      "❌ Get All Blogs Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to fetch blogs.",
    });
  }
};

// ==================================================
// ADMIN - GET BLOG BY ID
// ==================================================

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
    }

    const blog = await Blog.findById(id)
      .populate(
        "author",
        "fullName email profileImage"
      )
      .lean();

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error(
      "❌ Get Blog By ID Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to fetch blog.",
    });
  }
};

// ==================================================
// ADMIN - UPDATE BLOG
// ==================================================

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    const body = req.body || {};

    // ================= TITLE =================

    if (body.title !== undefined) {
      if (typeof body.title !== "string") {
        return res.status(400).json({
          success: false,
          message: "Title must be text.",
        });
      }

      const newTitle = cleanString(
        body.title,
        200
      );

      if (newTitle.length < 3) {
        return res.status(400).json({
          success: false,
          message:
            "Blog title must be at least 3 characters.",
        });
      }

      const newSlug = createSlug(newTitle);

      if (!newSlug) {
        return res.status(400).json({
          success: false,
          message:
            "Unable to generate a valid blog slug.",
        });
      }

      const duplicate =
        await Blog.findOne({
          slug: newSlug,
          _id: { $ne: blog._id },
        }).select("_id");

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message:
            "A blog with this title already exists.",
        });
      }

      blog.title = newTitle;
      blog.slug = newSlug;
    }

    // ================= EXCERPT =================

    if (body.excerpt !== undefined) {
      if (
        typeof body.excerpt !== "string"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Excerpt must be text.",
        });
      }

      blog.excerpt = cleanString(
        body.excerpt,
        500
      );
    }

    // ================= CONTENT =================

    if (body.content !== undefined) {
      if (
        typeof body.content !== "string"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Content must be text.",
        });
      }

      const newContent = cleanString(
        body.content,
        50000
      );

      if (!newContent) {
        return res.status(400).json({
          success: false,
          message:
            "Content cannot be empty.",
        });
      }

      blog.content = newContent;
    }

    // ================= FEATURED IMAGE =================

    if (
      body.featuredImage !== undefined
    ) {
      if (
        typeof body.featuredImage !==
        "string"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Featured image must be text.",
        });
      }

      blog.featuredImage =
        cleanString(
          body.featuredImage,
          1000
        );
    }

    // ================= CATEGORY =================

    if (body.category !== undefined) {
      if (
        typeof body.category !== "string"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Category must be text.",
        });
      }

      const newCategory =
        cleanString(
          body.category,
          100
        );

      if (!newCategory) {
        return res.status(400).json({
          success: false,
          message:
            "Category cannot be empty.",
        });
      }

      blog.category = newCategory;
    }

    // ================= TAGS =================

    if (body.tags !== undefined) {
      if (!Array.isArray(body.tags)) {
        return res.status(400).json({
          success: false,
          message:
            "Tags must be an array.",
        });
      }

      blog.tags = cleanTags(body.tags);
    }

    // ================= STATUS =================

    if (body.status !== undefined) {
      if (
        !allowedStatuses.includes(
          body.status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid blog status.",
        });
      }

      blog.status = body.status;

      if (body.status === "published") {
        if (!blog.publishedAt) {
          blog.publishedAt = new Date();
        }
      }

      if (body.status === "draft") {
        blog.publishedAt = null;
      }
    }

    // ================= FEATURED =================

    if (body.isFeatured !== undefined) {
      blog.isFeatured = parseBoolean(
        body.isFeatured,
        blog.isFeatured
      );
    }

    // ================= PUBLISHED DATE =================

    if (body.publishedAt !== undefined) {
      if (
        body.publishedAt === null ||
        body.publishedAt === ""
      ) {
        blog.publishedAt = null;
      } else {
        const parsedDate =
          parsePublishedDate(
            body.publishedAt
          );

        if (!parsedDate) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid published date.",
          });
        }

        blog.publishedAt = parsedDate;
      }
    }

    // ================= CONSISTENCY =================

    if (
      blog.status === "published" &&
      !blog.publishedAt
    ) {
      blog.publishedAt = new Date();
    }

    if (blog.status === "draft") {
      blog.publishedAt = null;
    }

    const updatedBlog =
      await blog.save();

    return res.status(200).json({
      success: true,
      message:
        "Blog updated successfully.",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error(
      "❌ Update Blog Error:",
      error
    );

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A blog with this title already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Unable to update blog.",
    });
  }
};

// ==================================================
// ADMIN - DELETE BLOG
// ==================================================

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
    }

    const blog =
      await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Blog deleted successfully.",
    });
  } catch (error) {
    console.error(
      "❌ Delete Blog Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to delete blog.",
    });
  }
};

// ==================================================
// EXPORTS
// ==================================================

module.exports = {
  createBlog,
  getBlogs,
  getBlogBySlug,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};