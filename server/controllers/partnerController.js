const mongoose = require("mongoose");
const Partner = require("../models/Partner");

// ==================================================
// CONSTANTS
// ==================================================

const ALLOWED_STATUSES = [
  "draft",
  "published",
  "archived",
];

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

const validateRequiredString = (
  value,
  fieldName,
  minLength,
  maxLength
) => {
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
    .slice(0, 160);
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
  const page = Math.max(
    Number.parseInt(req.query.page, 10) || 1,
    1
  );

  const requestedLimit =
    Number.parseInt(req.query.limit, 10) || 20;

  const limit = Math.min(
    Math.max(requestedLimit, 1),
    100
  );

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
};

// ==================================================
// CREATE PARTNER - ADMIN
// POST /api/partners/admin
// ==================================================

const createPartner = async (req, res) => {
  try {
    const body = req.body || {};

    const {
      name,
      slug,
      logo,
      description,
      website,
      category,
      status,
      isFeatured,
      displayOrder,
    } = body;

    // ---------------- NAME ----------------

    const nameError = validateRequiredString(
      name,
      "Partner name",
      2,
      150
    );

    if (nameError) {
      return res.status(400).json({
        success: false,
        message: nameError,
      });
    }

    // ---------------- DESCRIPTION ----------------

    const descriptionError = validateRequiredString(
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

    // ---------------- CATEGORY ----------------

    const categoryError = validateRequiredString(
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

    // ---------------- SLUG ----------------

    const partnerSlug = createSlug(
      slug !== undefined && slug !== ""
        ? slug
        : cleanName
    );

    if (!partnerSlug || partnerSlug.length < 2) {
      return res.status(400).json({
        success: false,
        message: "A valid partner slug is required.",
      });
    }

    // ---------------- STATUS ----------------

    const partnerStatus =
      status === undefined || status === ""
        ? "published"
        : String(status).trim().toLowerCase();

    if (!ALLOWED_STATUSES.includes(partnerStatus)) {
      return res.status(400).json({
        success: false,
        message:
          "Status must be draft, published or archived.",
      });
    }

    // ---------------- FEATURED ----------------

    const featured = parseBoolean(
      isFeatured,
      false
    );

    if (featured === null) {
      return res.status(400).json({
        success: false,
        message: "isFeatured must be a boolean.",
      });
    }

    // ---------------- DISPLAY ORDER ----------------

    const order = parseDisplayOrder(
      displayOrder,
      0
    );

    if (order === null) {
      return res.status(400).json({
        success: false,
        message:
          "Display order must be a non-negative number.",
      });
    }

    // ---------------- DUPLICATE CHECK ----------------

    const existingPartner = await Partner.findOne({
      $or: [
        { name: cleanName },
        { slug: partnerSlug },
      ],
    }).lean();

    if (existingPartner) {
      return res.status(409).json({
        success: false,
        message:
          "Partner with the same name or slug already exists.",
      });
    }

    // ---------------- CREATE ----------------

    const partner = await Partner.create({
      name: cleanName,
      slug: partnerSlug,
      logo: cleanString(logo, 500),
      description: cleanDescription,
      website: cleanString(website, 500),
      category: cleanCategory,
      status: partnerStatus,
      isFeatured: featured,
      displayOrder: order,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Partner created successfully.",
      partner,
    });
  } catch (error) {
    console.error("Create Partner Error:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Partner with the same name or slug already exists.",
      });
    }

    if (error.name === "ValidationError") {
      const errors = {};

      Object.keys(error.errors).forEach((field) => {
        errors[field] = error.errors[field].message;
      });

      return res.status(400).json({
        success: false,
        message: "Partner validation failed.",
        errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create partner.",
    });
  }
};

// ==================================================
// GET PUBLISHED PARTNERS - PUBLIC
// GET /api/partners
// ==================================================

const getPublishedPartners = async (req, res) => {
  try {
    const {
      page,
      limit,
      skip,
    } = getPagination(req);

    const filter = {
      status: "published",
    };

    const [partners, total] = await Promise.all([
      Partner.find(filter)
        .select("-createdBy")
        .sort({
          isFeatured: -1,
          displayOrder: 1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Partner.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      partners,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(
      "Get Published Partners Error:",
      {
        name: error.name,
        message: error.message,
      }
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch partners.",
    });
  }
};

// ==================================================
// GET PARTNER BY SLUG - PUBLIC
// GET /api/partners/slug/:slug
// ==================================================

const getPartnerBySlug = async (req, res) => {
  try {
    const slug = createSlug(req.params.slug);

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Invalid partner slug.",
      });
    }

    const partner = await Partner.findOne({
      slug,
      status: "published",
    })
      .select("-createdBy")
      .lean();

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Partner not found.",
      });
    }

    return res.status(200).json({
      success: true,
      partner,
    });
  } catch (error) {
    console.error(
      "Get Partner By Slug Error:",
      {
        name: error.name,
        message: error.message,
      }
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch partner.",
    });
  }
};

// ==================================================
// GET ALL PARTNERS - ADMIN
// GET /api/partners/admin/all
// ==================================================

const getAllPartners = async (req, res) => {
  try {
    const {
      page,
      limit,
      skip,
    } = getPagination(req);

    const [partners, total] = await Promise.all([
      Partner.find()
        .populate(
          "createdBy",
          "fullName email profileImage"
        )
        .sort({
          displayOrder: 1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Partner.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      partners,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get All Partners Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to fetch partners.",
    });
  }
};

// ==================================================
// GET PARTNER BY ID - ADMIN
// GET /api/partners/admin/:id
// ==================================================

const getPartnerById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid partner ID.",
      });
    }

    const partner = await Partner.findById(id)
      .populate(
        "createdBy",
        "fullName email profileImage"
      )
      .lean();

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Partner not found.",
      });
    }

    return res.status(200).json({
      success: true,
      partner,
    });
  } catch (error) {
    console.error("Get Partner By ID Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to fetch partner.",
    });
  }
};

// ==================================================
// UPDATE PARTNER - ADMIN
// PUT /api/partners/admin/:id
// ==================================================

const updatePartner = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid partner ID.",
      });
    }

    const partner = await Partner.findById(id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Partner not found.",
      });
    }

    const body = req.body || {};

    const {
      name,
      slug,
      logo,
      description,
      website,
      category,
      status,
      isFeatured,
      displayOrder,
    } = body;

    // ---------------- NAME ----------------

    if (name !== undefined) {
      const errorMessage = validateRequiredString(
        name,
        "Partner name",
        2,
        150
      );

      if (errorMessage) {
        return res.status(400).json({
          success: false,
          message: errorMessage,
        });
      }

      partner.name = name.trim();
    }

    // ---------------- LOGO ----------------

    if (logo !== undefined) {
      if (typeof logo !== "string") {
        return res.status(400).json({
          success: false,
          message: "Logo must be a string.",
        });
      }

      if (logo.trim().length > 500) {
        return res.status(400).json({
          success: false,
          message:
            "Logo path cannot exceed 500 characters.",
        });
      }

      partner.logo = logo.trim();
    }

    // ---------------- DESCRIPTION ----------------

    if (description !== undefined) {
      const errorMessage = validateRequiredString(
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

      partner.description = description.trim();
    }

    // ---------------- WEBSITE ----------------

    if (website !== undefined) {
      if (typeof website !== "string") {
        return res.status(400).json({
          success: false,
          message: "Website must be a string.",
        });
      }

      if (website.trim().length > 500) {
        return res.status(400).json({
          success: false,
          message:
            "Website URL cannot exceed 500 characters.",
        });
      }

      partner.website = website.trim();
    }

    // ---------------- CATEGORY ----------------

    if (category !== undefined) {
      const errorMessage = validateRequiredString(
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

      partner.category = category.trim();
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
          message:
            "Status must be draft, published or archived.",
        });
      }

      partner.status = cleanStatus;
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

      partner.isFeatured = featured;
    }

    // ---------------- DISPLAY ORDER ----------------

    if (displayOrder !== undefined) {
      const order = parseDisplayOrder(displayOrder);

      if (order === null) {
        return res.status(400).json({
          success: false,
          message:
            "Display order must be a non-negative number.",
        });
      }

      partner.displayOrder = order;
    }

    // ---------------- SLUG ----------------

    if (slug !== undefined) {
      if (typeof slug !== "string" || !slug.trim()) {
        return res.status(400).json({
          success: false,
          message: "Partner slug cannot be empty.",
        });
      }

      const generatedSlug = createSlug(slug);

      if (!generatedSlug || generatedSlug.length < 2) {
        return res.status(400).json({
          success: false,
          message: "Invalid partner slug.",
        });
      }

      partner.slug = generatedSlug;
    } else if (name !== undefined) {
      const generatedSlug = createSlug(partner.name);

      if (!generatedSlug || generatedSlug.length < 2) {
        return res.status(400).json({
          success: false,
          message:
            "Unable to generate partner slug.",
        });
      }

      partner.slug = generatedSlug;
    }

    // ---------------- DUPLICATE CHECK ----------------

    const duplicate = await Partner.findOne({
      _id: { $ne: partner._id },
      $or: [
        { name: partner.name },
        { slug: partner.slug },
      ],
    }).lean();

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message:
          "Partner with the same name or slug already exists.",
      });
    }

    // ---------------- SAVE ----------------

    await partner.save();

    return res.status(200).json({
      success: true,
      message: "Partner updated successfully.",
      partner,
    });
  } catch (error) {
    console.error("Update Partner Error:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Partner with the same name or slug already exists.",
      });
    }

    if (error.name === "ValidationError") {
      const errors = {};

      Object.keys(error.errors).forEach((field) => {
        errors[field] = error.errors[field].message;
      });

      return res.status(400).json({
        success: false,
        message: "Partner validation failed.",
        errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to update partner.",
    });
  }
};

// ==================================================
// DELETE PARTNER - ADMIN
// DELETE /api/partners/admin/:id
// ==================================================

const deletePartner = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid partner ID.",
      });
    }

    const partner = await Partner.findById(id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Partner not found.",
      });
    }

    await partner.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Partner deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Partner Error:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to delete partner.",
    });
  }
};

// ==================================================
// EXPORTS
// ==================================================

module.exports = {
  createPartner,
  getPublishedPartners,
  getPartnerBySlug,
  getAllPartners,
  getPartnerById,
  updatePartner,
  deletePartner,
};