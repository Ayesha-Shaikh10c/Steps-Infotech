const mongoose = require("mongoose");
const Technology = require("../models/Technology");

// ==================================================
// CONSTANTS
// ==================================================

const ALLOWED_STATUSES = ["draft", "published"];

// ==================================================
// HELPERS
// ==================================================

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const cleanString = (value, maxLength) => {
  if (typeof value !== "string") return "";

  const cleaned = value.trim();

  if (maxLength && cleaned.length > maxLength) {
    return cleaned.slice(0, maxLength);
  }

  return cleaned;
};

const cleanRequiredString = (value, fieldName, minLength, maxLength) => {
  if (typeof value !== "string") {
    return `${fieldName} is required`;
  }

  const cleaned = value.trim();

  if (!cleaned) {
    return `${fieldName} is required`;
  }

  if (cleaned.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }

  if (cleaned.length > maxLength) {
    return `${fieldName} cannot exceed ${maxLength} characters`;
  }

  return null;
};

const createSlug = (value) => {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
};

const parseBoolean = (value, defaultValue = false) => {
  if (value === undefined || value === null || value === "") {
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

  return null;
};

const parseDisplayOrder = (value, defaultValue = 0) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    return null;
  }

  return number;
};

const getPagination = (req) => {
  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);

  const requestedLimit =
    Number.parseInt(req.query.limit, 10) || 20;

  const limit = Math.min(Math.max(requestedLimit, 1), 100);

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
};

// ==================================================
// CREATE TECHNOLOGY - ADMIN
// POST /api/technologies/admin
// ==================================================

const createTechnology = async (req, res) => {
  try {
    const body = req.body || {};

    const {
      name,
      slug,
      description,
      icon,
      image,
      category,
      status,
      isFeatured,
      displayOrder,
    } = body;

    const nameError = cleanRequiredString(
      name,
      "Technology name",
      2,
      100
    );

    if (nameError) {
      return res.status(400).json({
        success: false,
        message: nameError,
      });
    }

    const descriptionError = cleanRequiredString(
      description,
      "Description",
      10,
      1000
    );

    if (descriptionError) {
      return res.status(400).json({
        success: false,
        message: descriptionError,
      });
    }

    const categoryError = cleanRequiredString(
      category,
      "Category",
      2,
      100
    );

    if (categoryError) {
      return res.status(400).json({
        success: false,
        message: categoryError,
      });
    }

    const cleanName = name.trim();
    const cleanDescription = description.trim();
    const cleanCategory = category.trim();

    const technologySlug = createSlug(
      slug !== undefined && slug !== ""
        ? slug
        : cleanName
    );

    if (!technologySlug) {
      return res.status(400).json({
        success: false,
        message: "A valid technology slug is required.",
      });
    }

    if (technologySlug.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Technology slug must be at least 2 characters.",
      });
    }

    const technologyStatus =
      status === undefined || status === ""
        ? "published"
        : String(status).trim().toLowerCase();

    if (!ALLOWED_STATUSES.includes(technologyStatus)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either draft or published.",
      });
    }

    const featured = parseBoolean(isFeatured, false);

    if (featured === null) {
      return res.status(400).json({
        success: false,
        message: "isFeatured must be a boolean.",
      });
    }

    const order = parseDisplayOrder(displayOrder, 0);

    if (order === null) {
      return res.status(400).json({
        success: false,
        message: "Display order must be a non-negative number.",
      });
    }

    const existingTechnology = await Technology.findOne({
      $or: [
        { name: cleanName },
        { slug: technologySlug },
      ],
    }).lean();

    if (existingTechnology) {
      return res.status(409).json({
        success: false,
        message: "Technology with the same name or slug already exists.",
      });
    }

    const technology = await Technology.create({
      name: cleanName,
      slug: technologySlug,
      description: cleanDescription,
      icon: cleanString(icon, 500),
      image: cleanString(image, 500),
      category: cleanCategory,
      status: technologyStatus,
      isFeatured: featured,
      displayOrder: order,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Technology created successfully.",
      technology,
    });
  } catch (error) {
    console.error("Create Technology Error:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Technology with the same name or slug already exists.",
      });
    }

    if (error.name === "ValidationError") {
      const errors = {};

      Object.keys(error.errors).forEach((field) => {
        errors[field] = error.errors[field].message;
      });

      return res.status(400).json({
        success: false,
        message: "Technology validation failed.",
        errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create technology.",
    });
  }
};

// ==================================================
// GET PUBLISHED TECHNOLOGIES - PUBLIC
// GET /api/technologies
// ==================================================

const getPublishedTechnologies = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req);

    const filter = {
      status: "published",
    };

    const [technologies, total] = await Promise.all([
      Technology.find(filter)
        .select("-createdBy")
        .sort({
          isFeatured: -1,
          displayOrder: 1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Technology.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      technologies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get Published Technologies Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to fetch technologies.",
    });
  }
};

// ==================================================
// GET TECHNOLOGY BY SLUG - PUBLIC
// GET /api/technologies/:slug
// ==================================================

const getTechnologyBySlug = async (req, res) => {
  try {
    const slug = createSlug(req.params.slug);

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Invalid technology slug.",
      });
    }

    const technology = await Technology.findOne({
      slug,
      status: "published",
    })
      .select("-createdBy")
      .lean();

    if (!technology) {
      return res.status(404).json({
        success: false,
        message: "Technology not found.",
      });
    }

    return res.status(200).json({
      success: true,
      technology,
    });
  } catch (error) {
    console.error("Get Technology By Slug Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to fetch technology.",
    });
  }
};

// ==================================================
// GET ALL TECHNOLOGIES - ADMIN
// GET /api/technologies/admin/all
// ==================================================

const getAllTechnologies = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req);

    const [technologies, total] = await Promise.all([
      Technology.find()
        .populate("createdBy", "fullName email profileImage")
        .sort({
          displayOrder: 1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Technology.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      technologies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get All Technologies Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to fetch technologies.",
    });
  }
};

// ==================================================
// GET TECHNOLOGY BY ID - ADMIN
// GET /api/technologies/admin/:id
// ==================================================

const getTechnologyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid technology ID.",
      });
    }

    const technology = await Technology.findById(id)
      .populate("createdBy", "fullName email profileImage")
      .lean();

    if (!technology) {
      return res.status(404).json({
        success: false,
        message: "Technology not found.",
      });
    }

    return res.status(200).json({
      success: true,
      technology,
    });
  } catch (error) {
    console.error("Get Technology By ID Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to fetch technology.",
    });
  }
};

// ==================================================
// UPDATE TECHNOLOGY - ADMIN
// PUT /api/technologies/admin/:id
// ==================================================

const updateTechnology = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid technology ID.",
      });
    }

    const technology = await Technology.findById(id);

    if (!technology) {
      return res.status(404).json({
        success: false,
        message: "Technology not found.",
      });
    }

    const body = req.body || {};

    const {
      name,
      slug,
      description,
      icon,
      image,
      category,
      status,
      isFeatured,
      displayOrder,
    } = body;

    // ---------------- NAME ----------------

    if (name !== undefined) {
      const errorMessage = cleanRequiredString(
        name,
        "Technology name",
        2,
        100
      );

      if (errorMessage) {
        return res.status(400).json({
          success: false,
          message: errorMessage,
        });
      }

      technology.name = name.trim();
    }

    // ---------------- DESCRIPTION ----------------

    if (description !== undefined) {
      const errorMessage = cleanRequiredString(
        description,
        "Description",
        10,
        1000
      );

      if (errorMessage) {
        return res.status(400).json({
          success: false,
          message: errorMessage,
        });
      }

      technology.description = description.trim();
    }

    // ---------------- ICON ----------------

    if (icon !== undefined) {
      if (typeof icon !== "string") {
        return res.status(400).json({
          success: false,
          message: "Icon must be a string.",
        });
      }

      if (icon.trim().length > 500) {
        return res.status(400).json({
          success: false,
          message: "Icon path cannot exceed 500 characters.",
        });
      }

      technology.icon = icon.trim();
    }

    // ---------------- IMAGE ----------------

    if (image !== undefined) {
      if (typeof image !== "string") {
        return res.status(400).json({
          success: false,
          message: "Image must be a string.",
        });
      }

      if (image.trim().length > 500) {
        return res.status(400).json({
          success: false,
          message: "Image path cannot exceed 500 characters.",
        });
      }

      technology.image = image.trim();
    }

    // ---------------- CATEGORY ----------------

    if (category !== undefined) {
      const errorMessage = cleanRequiredString(
        category,
        "Category",
        2,
        100
      );

      if (errorMessage) {
        return res.status(400).json({
          success: false,
          message: errorMessage,
        });
      }

      technology.category = category.trim();
    }

    // ---------------- STATUS ----------------

    if (status !== undefined) {
      const cleanStatus =
        typeof status === "string"
          ? status.trim().toLowerCase()
          : "";

      if (!ALLOWED_STATUSES.includes(cleanStatus)) {
        return res.status(400).json({
          success: false,
          message: "Status must be either draft or published.",
        });
      }

      technology.status = cleanStatus;
    }

    // ---------------- FEATURED ----------------

    if (isFeatured !== undefined) {
      const featured = parseBoolean(isFeatured);

      if (featured === null) {
        return res.status(400).json({
          success: false,
          message: "isFeatured must be a boolean.",
        });
      }

      technology.isFeatured = featured;
    }

    // ---------------- DISPLAY ORDER ----------------

    if (displayOrder !== undefined) {
      const order = parseDisplayOrder(displayOrder);

      if (order === null) {
        return res.status(400).json({
          success: false,
          message: "Display order must be a non-negative number.",
        });
      }

      technology.displayOrder = order;
    }

    // ---------------- SLUG ----------------
    // Explicit slug gets priority.
    // If name changes without slug, regenerate slug from name.

    if (slug !== undefined) {
      if (typeof slug !== "string" || !slug.trim()) {
        return res.status(400).json({
          success: false,
          message: "Technology slug cannot be empty.",
        });
      }

      const generatedSlug = createSlug(slug);

      if (!generatedSlug || generatedSlug.length < 2) {
        return res.status(400).json({
          success: false,
          message: "Invalid technology slug.",
        });
      }

      technology.slug = generatedSlug;
    } else if (name !== undefined) {
      const generatedSlug = createSlug(technology.name);

      if (!generatedSlug) {
        return res.status(400).json({
          success: false,
          message: "Unable to generate technology slug.",
        });
      }

      technology.slug = generatedSlug;
    }

    // ---------------- DUPLICATE CHECK ----------------

    const duplicate = await Technology.findOne({
      _id: { $ne: technology._id },
      $or: [
        { name: technology.name },
        { slug: technology.slug },
      ],
    }).lean();

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "Technology with the same name or slug already exists.",
      });
    }

    await technology.save();

    return res.status(200).json({
      success: true,
      message: "Technology updated successfully.",
      technology,
    });
  } catch (error) {
    console.error("Update Technology Error:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Technology with the same name or slug already exists.",
      });
    }

    if (error.name === "ValidationError") {
      const errors = {};

      Object.keys(error.errors).forEach((field) => {
        errors[field] = error.errors[field].message;
      });

      return res.status(400).json({
        success: false,
        message: "Technology validation failed.",
        errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to update technology.",
    });
  }
};

// ==================================================
// DELETE TECHNOLOGY - ADMIN
// DELETE /api/technologies/admin/:id
// ==================================================

const deleteTechnology = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid technology ID.",
      });
    }

    const technology = await Technology.findById(id);

    if (!technology) {
      return res.status(404).json({
        success: false,
        message: "Technology not found.",
      });
    }

    await technology.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Technology deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Technology Error:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to delete technology.",
    });
  }
};

// ==================================================
// EXPORTS
// ==================================================

module.exports = {
  createTechnology,
  getPublishedTechnologies,
  getTechnologyBySlug,
  getAllTechnologies,
  getTechnologyById,
  updateTechnology,
  deleteTechnology,
};