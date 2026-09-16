const mongoose = require("mongoose");
const Testimonial = require("../models/Testimonial");

// ==================================================
// HELPERS
// ==================================================

const ALLOWED_STATUSES = ["draft", "published"];

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const cleanString = (value, maxLength) => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
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

const parseRating = (value) => {
  const rating = Number(value);

  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return null;
  }

  return rating;
};

const parseDisplayOrder = (value, defaultValue = 0) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  const displayOrder = Number(value);

  if (!Number.isFinite(displayOrder) || displayOrder < 0) {
    return null;
  }

  return Math.floor(displayOrder);
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
// CREATE TESTIMONIAL - ADMIN
// POST /api/testimonials/admin
// ==================================================

const createTestimonial = async (req, res) => {
  try {
    const body = req.body || {};

    const clientName = cleanString(body.clientName, 100);
    const designation = cleanString(body.designation, 100);
    const company = cleanString(body.company, 150);
    const message = cleanString(body.message, 1000);
    const profileImage = cleanString(body.profileImage, 500);

    if (!clientName || !designation || !company || !message) {
      return res.status(400).json({
        success: false,
        message:
          "Client name, designation, company and message are required.",
      });
    }

    const rating = parseRating(body.rating);

    if (rating === null) {
      return res.status(400).json({
        success: false,
        message: "Rating must be a number between 1 and 5.",
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

    const testimonial = await Testimonial.create({
      clientName,
      designation,
      company,
      profileImage,
      rating,
      message,
      status,
      isFeatured: parseBoolean(body.isFeatured, false),
      displayOrder,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Testimonial created successfully.",
      testimonial,
    });
  } catch (error) {
    console.error("Create Testimonial Error:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial data.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ==================================================
// GET PUBLISHED TESTIMONIALS - PUBLIC
// GET /api/testimonials
// ==================================================

const getPublishedTestimonials = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req);

    const filter = {
      status: "published",
    };

    const [testimonials, total] = await Promise.all([
      Testimonial.find(filter)
        .select("-createdBy")
        .sort({
          displayOrder: 1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Testimonial.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      testimonials,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get Published Testimonials Error:", {
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
// GET ALL TESTIMONIALS - ADMIN
// GET /api/testimonials/admin/all
// ==================================================

const getAllTestimonials = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req);

    const [testimonials, total] = await Promise.all([
      Testimonial.find()
        .populate("createdBy", "fullName profileImage")
        .sort({
          displayOrder: 1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Testimonial.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      testimonials,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get All Testimonials Error:", {
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
// GET SINGLE TESTIMONIAL - ADMIN
// GET /api/testimonials/admin/:id
// ==================================================

const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID.",
      });
    }

    const testimonial = await Testimonial.findById(id)
      .populate("createdBy", "fullName profileImage")
      .lean();

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    return res.status(200).json({
      success: true,
      testimonial,
    });
  } catch (error) {
    console.error("Get Testimonial By ID Error:", {
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
// UPDATE TESTIMONIAL - ADMIN
// PUT /api/testimonials/admin/:id
// ==================================================

const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID.",
      });
    }

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    // ----------------------------------------------
    // CLIENT INFO
    // ----------------------------------------------

    if (body.clientName !== undefined) {
      const value = cleanString(body.clientName, 100);

      if (!value) {
        return res.status(400).json({
          success: false,
          message: "Client name cannot be empty.",
        });
      }

      testimonial.clientName = value;
    }

    if (body.designation !== undefined) {
      const value = cleanString(body.designation, 100);

      if (!value) {
        return res.status(400).json({
          success: false,
          message: "Designation cannot be empty.",
        });
      }

      testimonial.designation = value;
    }

    if (body.company !== undefined) {
      const value = cleanString(body.company, 150);

      if (!value) {
        return res.status(400).json({
          success: false,
          message: "Company name cannot be empty.",
        });
      }

      testimonial.company = value;
    }

    if (body.profileImage !== undefined) {
      testimonial.profileImage = cleanString(body.profileImage, 500);
    }

    // ----------------------------------------------
    // RATING
    // ----------------------------------------------

    if (body.rating !== undefined) {
      const rating = parseRating(body.rating);

      if (rating === null) {
        return res.status(400).json({
          success: false,
          message: "Rating must be a number between 1 and 5.",
        });
      }

      testimonial.rating = rating;
    }

    // ----------------------------------------------
    // MESSAGE
    // ----------------------------------------------

    if (body.message !== undefined) {
      const message = cleanString(body.message, 1000);

      if (!message) {
        return res.status(400).json({
          success: false,
          message: "Testimonial message cannot be empty.",
        });
      }

      testimonial.message = message;
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

      testimonial.status = status;
    }

    // ----------------------------------------------
    // FEATURED
    // ----------------------------------------------

    if (body.isFeatured !== undefined) {
      const normalizedBoolean =
        typeof body.isFeatured === "boolean"
          ? body.isFeatured
          : String(body.isFeatured).trim().toLowerCase();

      if (
        normalizedBoolean !== true &&
        normalizedBoolean !== false &&
        normalizedBoolean !== "true" &&
        normalizedBoolean !== "false"
      ) {
        return res.status(400).json({
          success: false,
          message: "isFeatured must be a boolean.",
        });
      }

      testimonial.isFeatured = parseBoolean(body.isFeatured);
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

      testimonial.displayOrder = displayOrder;
    }

    await testimonial.save();

    return res.status(200).json({
      success: true,
      message: "Testimonial updated successfully.",
      testimonial,
    });
  } catch (error) {
    console.error("Update Testimonial Error:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial data.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ==================================================
// DELETE TESTIMONIAL - ADMIN
// DELETE /api/testimonials/admin/:id
// ==================================================

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid testimonial ID.",
      });
    }

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found.",
      });
    }

    await Testimonial.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Testimonial Error:", {
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
  createTestimonial,
  getPublishedTestimonials,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
};