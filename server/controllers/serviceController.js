const mongoose = require("mongoose");
const Service = require("../models/Service");

// ==================================================
// HELPERS
// ==================================================

const ALLOWED_STATUSES = ["draft", "published"];

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const cleanString = (value, maxLength) => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
};

const cleanStringArray = (value, maxItemLength) => {
  if (!Array.isArray(value)) return [];

  return [
    ...new Set(
      value
        .filter((item) => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => item.slice(0, maxItemLength))
    ),
  ];
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

  return defaultValue;
};

const parseDisplayOrder = (value, defaultValue = 0) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    return null;
  }

  return Math.floor(number);
};

const createSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const getPagination = (req) => {
  const rawPage = Number.parseInt(req.query.page, 10);
  const rawLimit = Number.parseInt(req.query.limit, 10);

  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  const limit =
    Number.isInteger(rawLimit) && rawLimit > 0
      ? Math.min(rawLimit, 100)
      : 20;

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
};

// ==================================================
// CREATE SERVICE - ADMIN
// POST /api/services/admin
// ==================================================

const createService = async (req, res) => {
  try {
    const body = req.body || {};

    const title = cleanString(body.title, 150);
    const shortDescription = cleanString(body.shortDescription, 300);
    const description = cleanString(body.description, 5000);
    const category = cleanString(body.category, 100);

    if (!title || !shortDescription || !description || !category) {
      return res.status(400).json({
        success: false,
        message:
          "Title, short description, description and category are required.",
      });
    }

    const slug = createSlug(title);

    if (!slug || slug.length < 3) {
      return res.status(400).json({
        success: false,
        message: "A valid service title is required.",
      });
    }

    if (slug.length > 160) {
      return res.status(400).json({
        success: false,
        message: "Service title is too long to create a valid slug.",
      });
    }

    const existingService = await Service.exists({ slug });

    if (existingService) {
      return res.status(409).json({
        success: false,
        message: "A service with this title already exists.",
      });
    }

    const status =
      body.status === undefined || body.status === ""
        ? "draft"
        : cleanString(body.status, 20).toLowerCase();

    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either draft or published.",
      });
    }

    const displayOrder = parseDisplayOrder(body.displayOrder, 0);

    if (displayOrder === null) {
      return res.status(400).json({
        success: false,
        message: "Display order must be a non-negative number.",
      });
    }

    const service = await Service.create({
      title,
      slug,
      shortDescription,
      description,
      icon: cleanString(body.icon, 500),
      image: cleanString(body.image, 500),
      technologies: cleanStringArray(body.technologies, 100),
      features: cleanStringArray(body.features, 200),
      category,
      status,
      isFeatured: parseBoolean(body.isFeatured, false),
      displayOrder,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Service created successfully.",
      service,
    });
  } catch (error) {
    console.error("Create Service Error:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A service with this title already exists.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid service data.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ==================================================
// GET ALL PUBLISHED SERVICES - PUBLIC
// GET /api/services
// ==================================================

const getPublishedServices = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req);

    const filter = {
      status: "published",
    };

    const [services, total] = await Promise.all([
      Service.find(filter)
        .select("-createdBy")
        .sort({
          displayOrder: 1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Service.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      services,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get Published Services Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ==================================================
// GET SINGLE PUBLISHED SERVICE
// GET /api/services/slug/:slug
// ==================================================

const getServiceBySlug = async (req, res) => {
  try {
    const slug = cleanString(req.params.slug, 160).toLowerCase();

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Service slug is required.",
      });
    }

    const service = await Service.findOne({
      slug,
      status: "published",
    })
      .select("-createdBy")
      .lean();

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    return res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("Get Service By Slug Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ==================================================
// GET ALL SERVICES - ADMIN
// GET /api/services/admin/all
// ==================================================

const getAllServices = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req);

    const [services, total] = await Promise.all([
      Service.find()
        .populate("createdBy", "fullName profileImage")
        .sort({
          displayOrder: 1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Service.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      services,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get All Services Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ==================================================
// GET SINGLE SERVICE - ADMIN
// GET /api/services/admin/:id
// ==================================================

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID.",
      });
    }

    const service = await Service.findById(id)
      .populate("createdBy", "fullName profileImage")
      .lean();

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    return res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("Get Service By ID Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ==================================================
// UPDATE SERVICE - ADMIN
// PUT /api/services/admin/:id
// ==================================================

const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID.",
      });
    }

    const body = req.body || {};

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    // ----------------------------------------------
    // TITLE + SLUG
    // ----------------------------------------------

    if (body.title !== undefined) {
      const title = cleanString(body.title, 150);

      if (!title) {
        return res.status(400).json({
          success: false,
          message: "Service title cannot be empty.",
        });
      }

      if (title !== service.title) {
        const slug = createSlug(title);

        if (!slug || slug.length < 3 || slug.length > 160) {
          return res.status(400).json({
            success: false,
            message: "Invalid service title.",
          });
        }

        const existingService = await Service.exists({
          slug,
          _id: { $ne: service._id },
        });

        if (existingService) {
          return res.status(409).json({
            success: false,
            message: "A service with this title already exists.",
          });
        }

        service.title = title;
        service.slug = slug;
      }
    }

    // ----------------------------------------------
    // TEXT FIELDS
    // ----------------------------------------------

    if (body.shortDescription !== undefined) {
      const value = cleanString(body.shortDescription, 300);

      if (!value) {
        return res.status(400).json({
          success: false,
          message: "Short description cannot be empty.",
        });
      }

      service.shortDescription = value;
    }

    if (body.description !== undefined) {
      const value = cleanString(body.description, 5000);

      if (!value) {
        return res.status(400).json({
          success: false,
          message: "Description cannot be empty.",
        });
      }

      service.description = value;
    }

    if (body.category !== undefined) {
      const value = cleanString(body.category, 100);

      if (!value) {
        return res.status(400).json({
          success: false,
          message: "Category cannot be empty.",
        });
      }

      service.category = value;
    }

    // ----------------------------------------------
    // MEDIA
    // ----------------------------------------------

    if (body.icon !== undefined) {
      service.icon = cleanString(body.icon, 500);
    }

    if (body.image !== undefined) {
      service.image = cleanString(body.image, 500);
    }

    // ----------------------------------------------
    // ARRAYS
    // ----------------------------------------------

    if (body.technologies !== undefined) {
      if (!Array.isArray(body.technologies)) {
        return res.status(400).json({
          success: false,
          message: "Technologies must be an array.",
        });
      }

      service.technologies = cleanStringArray(body.technologies, 100);
    }

    if (body.features !== undefined) {
      if (!Array.isArray(body.features)) {
        return res.status(400).json({
          success: false,
          message: "Features must be an array.",
        });
      }

      service.features = cleanStringArray(body.features, 200);
    }

    // ----------------------------------------------
    // STATUS
    // ----------------------------------------------

    if (body.status !== undefined) {
      const status = cleanString(body.status, 20).toLowerCase();

      if (!ALLOWED_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Status must be either draft or published.",
        });
      }

      service.status = status;
    }

    // ----------------------------------------------
    // FEATURED
    // ----------------------------------------------

    if (body.isFeatured !== undefined) {
      if (
        typeof body.isFeatured !== "boolean" &&
        !["true", "false"].includes(
          String(body.isFeatured).trim().toLowerCase()
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "isFeatured must be a boolean.",
        });
      }

      service.isFeatured = parseBoolean(body.isFeatured);
    }

    // ----------------------------------------------
    // DISPLAY ORDER
    // ----------------------------------------------

    if (body.displayOrder !== undefined) {
      const displayOrder = parseDisplayOrder(body.displayOrder);

      if (displayOrder === null) {
        return res.status(400).json({
          success: false,
          message: "Display order must be a non-negative number.",
        });
      }

      service.displayOrder = displayOrder;
    }

    await service.save();

    return res.status(200).json({
      success: true,
      message: "Service updated successfully.",
      service,
    });
  } catch (error) {
    console.error("Update Service Error:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A service with this title already exists.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid service data.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ==================================================
// DELETE SERVICE - ADMIN
// DELETE /api/services/admin/:id
// ==================================================

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID.",
      });
    }

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    await Service.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Service Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ==================================================
// EXPORTS
// ==================================================

module.exports = {
  createService,
  getPublishedServices,
  getServiceBySlug,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};