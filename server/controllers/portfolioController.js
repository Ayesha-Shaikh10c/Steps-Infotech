const mongoose = require("mongoose");
const Portfolio = require("../models/Portfolio");

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

const cleanString = (value, maxLength = 500) => {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim().slice(0, maxLength);
};

const cleanStringArray = (value, maxLength = 100) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return [
    ...new Set(
      value
        .filter((item) => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => item.slice(0, maxLength))
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

    if (normalized === "true") {
      return true;
    }

    if (normalized === "false") {
      return false;
    }
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

  return number;
};

const parseCompletionDate = (value) => {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

const createSlug = (title) => {
  return String(title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160);
};

const getPagination = (req) => {
  const page = Math.max(
    Number.parseInt(req.query.page, 10) || 1,
    1
  );

  const limit = Math.min(
    Math.max(
      Number.parseInt(req.query.limit, 10) || 10,
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
// CREATE PORTFOLIO - ADMIN
// POST /api/portfolio/admin
// ==================================================

const createPortfolio = async (req, res) => {
  try {
    const body = req.body || {};

    const title = cleanString(body.title, 150);
    const shortDescription = cleanString(
      body.shortDescription,
      300
    );
    const description = cleanString(
      body.description,
      3000
    );
    const category = cleanString(body.category, 100);

    if (
      title.length < 2 ||
      shortDescription.length < 10 ||
      description.length < 20 ||
      category.length < 2
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, short description, description and category are required and must meet the minimum length requirements.",
      });
    }

    const slug = createSlug(title);

    if (slug.length < 2) {
      return res.status(400).json({
        success: false,
        message: "A valid project title is required.",
      });
    }

    const existingPortfolio = await Portfolio.findOne({
      slug,
    }).lean();

    if (existingPortfolio) {
      return res.status(409).json({
        success: false,
        message: "Portfolio with this title already exists.",
      });
    }

    const status = body.status || "draft";

    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either draft or published.",
      });
    }

    const displayOrder = parseDisplayOrder(
      body.displayOrder,
      0
    );

    if (displayOrder === null) {
      return res.status(400).json({
        success: false,
        message: "Display order must be a non-negative number.",
      });
    }

    const completionDate =
      parseCompletionDate(body.completionDate);

    if (
      body.completionDate !== undefined &&
      body.completionDate !== null &&
      body.completionDate !== "" &&
      completionDate === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid completion date.",
      });
    }

    const portfolio = await Portfolio.create({
      title,
      slug,
      shortDescription,
      description,
      featuredImage: cleanString(body.featuredImage, 500),
      gallery: cleanStringArray(body.gallery, 500),
      category,
      technologies: cleanStringArray(
        body.technologies,
        100
      ),
      client: cleanString(body.client, 150),
      projectUrl: cleanString(body.projectUrl, 500),
      githubUrl: cleanString(body.githubUrl, 500),
      completionDate,
      status,
      isFeatured: parseBoolean(
        body.isFeatured,
        false
      ),
      displayOrder,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Portfolio created successfully.",
      portfolio,
    });
  } catch (error) {
    console.error("Create Portfolio Error:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Portfolio with this title already exists.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid portfolio data.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ==================================================
// GET PUBLISHED PORTFOLIOS - PUBLIC
// GET /api/portfolio
// ==================================================

const getPublishedPortfolios = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req);

    const filter = {
      status: "published",
    };

    const [portfolios, total] = await Promise.all([
      Portfolio.find(filter)
        .select("-createdBy")
        .sort({
          displayOrder: 1,
          completionDate: -1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Portfolio.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      portfolios,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get Published Portfolios Error:", {
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
// GET PORTFOLIO BY SLUG - PUBLIC
// GET /api/portfolio/:slug
// ==================================================

const getPortfolioBySlug = async (req, res) => {
  try {
    const slug = cleanString(req.params.slug, 160)
      .toLowerCase();

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Portfolio slug is required.",
      });
    }

    const portfolio = await Portfolio.findOne({
      slug,
      status: "published",
    })
      .select("-createdBy")
      .lean();

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found.",
      });
    }

    return res.status(200).json({
      success: true,
      portfolio,
    });
  } catch (error) {
    console.error("Get Portfolio By Slug Error:", {
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
// GET ALL PORTFOLIOS - ADMIN
// GET /api/portfolio/admin/all
// ==================================================

const getAllPortfolios = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req);

    const [portfolios, total] = await Promise.all([
      Portfolio.find()
        .populate(
          "createdBy",
          "fullName email profileImage"
        )
        .sort({
          displayOrder: 1,
          completionDate: -1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Portfolio.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      portfolios,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get All Portfolios Error:", {
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
// GET SINGLE PORTFOLIO - ADMIN
// GET /api/portfolio/admin/:id
// ==================================================

const getPortfolioById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid portfolio ID.",
      });
    }

    const portfolio = await Portfolio.findById(id)
      .populate(
        "createdBy",
        "fullName email profileImage"
      )
      .lean();

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found.",
      });
    }

    return res.status(200).json({
      success: true,
      portfolio,
    });
  } catch (error) {
    console.error("Get Portfolio By ID Error:", {
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
// UPDATE PORTFOLIO - ADMIN
// PUT /api/portfolio/admin/:id
// ==================================================

const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid portfolio ID.",
      });
    }

    const portfolio = await Portfolio.findById(id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found.",
      });
    }

    const body = req.body || {};

    // ================= TITLE =================

    if (body.title !== undefined) {
      const title = cleanString(body.title, 150);

      if (title.length < 2) {
        return res.status(400).json({
          success: false,
          message: "Project title must be at least 2 characters.",
        });
      }

      if (title !== portfolio.title) {
        const newSlug = createSlug(title);

        if (newSlug.length < 2) {
          return res.status(400).json({
            success: false,
            message: "A valid project title is required.",
          });
        }

        const existingPortfolio =
          await Portfolio.findOne({
            slug: newSlug,
            _id: { $ne: portfolio._id },
          }).lean();

        if (existingPortfolio) {
          return res.status(409).json({
            success: false,
            message:
              "Portfolio with this title already exists.",
          });
        }

        portfolio.title = title;
        portfolio.slug = newSlug;
      }
    }

    // ================= TEXT FIELDS =================

    if (body.shortDescription !== undefined) {
      const value = cleanString(
        body.shortDescription,
        300
      );

      if (value.length < 10) {
        return res.status(400).json({
          success: false,
          message:
            "Short description must be at least 10 characters.",
        });
      }

      portfolio.shortDescription = value;
    }

    if (body.description !== undefined) {
      const value = cleanString(body.description, 3000);

      if (value.length < 20) {
        return res.status(400).json({
          success: false,
          message:
            "Project description must be at least 20 characters.",
        });
      }

      portfolio.description = value;
    }

    if (body.category !== undefined) {
      const value = cleanString(body.category, 100);

      if (value.length < 2) {
        return res.status(400).json({
          success: false,
          message:
            "Project category must be at least 2 characters.",
        });
      }

      portfolio.category = value;
    }

    // ================= MEDIA =================

    if (body.featuredImage !== undefined) {
      portfolio.featuredImage = cleanString(
        body.featuredImage,
        500
      );
    }

    if (body.gallery !== undefined) {
      if (!Array.isArray(body.gallery)) {
        return res.status(400).json({
          success: false,
          message: "Gallery must be an array.",
        });
      }

      portfolio.gallery = cleanStringArray(
        body.gallery,
        500
      );
    }

    // ================= TECHNOLOGIES =================

    if (body.technologies !== undefined) {
      if (!Array.isArray(body.technologies)) {
        return res.status(400).json({
          success: false,
          message: "Technologies must be an array.",
        });
      }

      portfolio.technologies = cleanStringArray(
        body.technologies,
        100
      );
    }

    // ================= CLIENT =================

    if (body.client !== undefined) {
      portfolio.client = cleanString(
        body.client,
        150
      );
    }

    // ================= LINKS =================

    if (body.projectUrl !== undefined) {
      portfolio.projectUrl = cleanString(
        body.projectUrl,
        500
      );
    }

    if (body.githubUrl !== undefined) {
      portfolio.githubUrl = cleanString(
        body.githubUrl,
        500
      );
    }

    // ================= COMPLETION DATE =================

    if (body.completionDate !== undefined) {
      const completionDate = parseCompletionDate(
        body.completionDate
      );

      if (
        body.completionDate !== null &&
        body.completionDate !== "" &&
        completionDate === null
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid completion date.",
        });
      }

      portfolio.completionDate = completionDate;
    }

    // ================= STATUS =================

    if (body.status !== undefined) {
      if (!ALLOWED_STATUSES.includes(body.status)) {
        return res.status(400).json({
          success: false,
          message:
            "Status must be either draft or published.",
        });
      }

      portfolio.status = body.status;
    }

    // ================= FEATURED =================

    if (body.isFeatured !== undefined) {
      if (
        typeof body.isFeatured !== "boolean" &&
        !["true", "false"].includes(
          String(body.isFeatured).trim().toLowerCase()
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "isFeatured must be true or false.",
        });
      }

      portfolio.isFeatured = parseBoolean(
        body.isFeatured,
        portfolio.isFeatured
      );
    }

    // ================= DISPLAY ORDER =================

    if (body.displayOrder !== undefined) {
      const displayOrder = parseDisplayOrder(
        body.displayOrder,
        portfolio.displayOrder
      );

      if (displayOrder === null) {
        return res.status(400).json({
          success: false,
          message:
            "Display order must be a non-negative number.",
        });
      }

      portfolio.displayOrder = displayOrder;
    }

    await portfolio.save();

    return res.status(200).json({
      success: true,
      message: "Portfolio updated successfully.",
      portfolio,
    });
  } catch (error) {
    console.error("Update Portfolio Error:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Portfolio with this title already exists.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid portfolio data.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ==================================================
// DELETE PORTFOLIO - ADMIN
// DELETE /api/portfolio/admin/:id
// ==================================================

const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid portfolio ID.",
      });
    }

    const portfolio = await Portfolio.findById(id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found.",
      });
    }

    await Portfolio.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Portfolio deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Portfolio Error:", {
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
  createPortfolio,
  getPublishedPortfolios,
  getPortfolioBySlug,
  getAllPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
};