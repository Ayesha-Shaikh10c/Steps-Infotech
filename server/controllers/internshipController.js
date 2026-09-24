const mongoose = require("mongoose");
const Internship = require("../models/Internship");

// ================= HELPERS =================

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const cleanString = (value, maxLength = 5000) => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
};

const cleanStringArray = (value, maxItems = 50, maxLength = 300) => {
  if (!Array.isArray(value)) return [];

  return [
    ...new Set(
      value
        .filter((item) => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => item.slice(0, maxLength))
    ),
  ].slice(0, maxItems);
};

const parseBoolean = (value, defaultValue = false) => {
  if (typeof value === "boolean") return value;

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    if (normalized === "true") return true;
    if (normalized === "false") return false;
  }

  return defaultValue;
};

const parseOpenings = (value, defaultValue = 1) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  const openings = Number(value);

  if (!Number.isInteger(openings) || openings < 1 || openings > 10000) {
    return null;
  }

  return openings;
};

const getPagination = (req) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);

  const limit = Math.min(
    Math.max(parseInt(req.query.limit, 10) || 10, 1),
    100
  );

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
};

// Exact values from Internship model
const allowedStatuses = ["draft", "open", "closed"];

const allowedInternshipTypes = [
  "Full Time",
  "Part Time",
  "Remote",
  "Hybrid",
];

// ================= VALIDATION =================

const validateInternshipData = (data, isUpdate = false) => {
  const errors = {};

  if (!isUpdate || data.title !== undefined) {
    const title = cleanString(data.title, 200);

    if (!title) {
      errors.title = "Title is required";
    }
  }

  if (!isUpdate || data.department !== undefined) {
    const department = cleanString(data.department, 150);

    if (!department) {
      errors.department = "Department is required";
    }
  }

  if (!isUpdate || data.location !== undefined) {
    const location = cleanString(data.location, 150);

    if (!location) {
      errors.location = "Location is required";
    }
  }

  if (!isUpdate || data.duration !== undefined) {
    const duration = cleanString(data.duration, 100);

    if (!duration) {
      errors.duration = "Duration is required";
    }
  }

  if (!isUpdate || data.description !== undefined) {
    const description = cleanString(data.description, 10000);

    if (!description) {
      errors.description = "Description is required";
    }
  }

  if (!isUpdate || data.applicationDeadline !== undefined) {
    if (!data.applicationDeadline) {
      errors.applicationDeadline = "Application deadline is required";
    } else {
      const deadline = new Date(data.applicationDeadline);

      if (Number.isNaN(deadline.getTime())) {
        errors.applicationDeadline = "Invalid application deadline";
      }
    }
  }

  if (data.internshipType !== undefined) {
    if (!allowedInternshipTypes.includes(data.internshipType)) {
      errors.internshipType = "Invalid internship type";
    }
  }

  if (data.status !== undefined) {
    if (!allowedStatuses.includes(data.status)) {
      errors.status = "Invalid internship status";
    }
  }

  if (data.openings !== undefined) {
    const openings = parseOpenings(data.openings);

    if (openings === null) {
      errors.openings = "Openings must be a whole number between 1 and 10000";
    }
  }

  if (data.isFeatured !== undefined) {
    if (
      typeof data.isFeatured !== "boolean" &&
      !["true", "false"].includes(String(data.isFeatured).toLowerCase())
    ) {
      errors.isFeatured = "isFeatured must be true or false";
    }
  }

  return errors;
};

// ================= CREATE INTERNSHIP =================

const createInternship = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const body = req.body || {};

    const errors = validateInternshipData(body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Please correct the internship details.",
        errors,
      });
    }

    const openings = parseOpenings(body.openings, 1);

    const internship = await Internship.create({
      title: cleanString(body.title, 200),
      department: cleanString(body.department, 150),
      location: cleanString(body.location, 150),

      internshipType:
        allowedInternshipTypes.includes(body.internshipType)
          ? body.internshipType
          : "Full Time",

      duration: cleanString(body.duration, 100),

      stipend:
        body.stipend !== undefined
          ? cleanString(body.stipend, 100)
          : "Unpaid",

      description: cleanString(body.description, 10000),

      responsibilities: cleanStringArray(body.responsibilities),
      requirements: cleanStringArray(body.requirements),
      skills: cleanStringArray(body.skills),

      openings,

      applicationDeadline: new Date(body.applicationDeadline),

      status: allowedStatuses.includes(body.status)
        ? body.status
        : "draft",

      isFeatured: parseBoolean(body.isFeatured, false),

      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Internship created successfully.",
      data: internship,
    });
  } catch (error) {
    console.error("❌ Create Internship Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create internship.",
    });
  }
};

// ================= PUBLIC: GET OPEN INTERNSHIPS =================

const getOpenInternships = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req);

    const filter = {
      status: "open",
      applicationDeadline: {
        $gte: new Date(),
      },
    };

    const [internships, total] = await Promise.all([
      Internship.find(filter)
        .select("-createdBy")
        .sort({
          isFeatured: -1,
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Internship.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: internships,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("❌ Get Open Internships Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch internships.",
    });
  }
};

// ================= PUBLIC: GET SINGLE INTERNSHIP =================

const getInternshipById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid internship ID.",
      });
    }

    const internship = await Internship.findOne({
      _id: id,
      status: "open",
      applicationDeadline: {
        $gte: new Date(),
      },
    })
      .select("-createdBy")
      .lean();

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: internship,
    });
  } catch (error) {
    console.error("❌ Get Internship Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch internship.",
    });
  }
};

// ================= ADMIN: GET ALL INTERNSHIPS =================

const getAllInternships = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req);

    const [internships, total] = await Promise.all([
      Internship.find()
        .populate("createdBy", "fullName email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Internship.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      data: internships,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("❌ Get All Internships Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch internships.",
    });
  }
};

// ================= ADMIN: UPDATE INTERNSHIP =================

const updateInternship = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid internship ID.",
      });
    }

    const body = req.body || {};

    const allowedFields = [
      "title",
      "department",
      "location",
      "internshipType",
      "duration",
      "stipend",
      "description",
      "responsibilities",
      "requirements",
      "skills",
      "openings",
      "applicationDeadline",
      "status",
      "isFeatured",
    ];

    const updateData = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update.",
      });
    }

    const errors = validateInternshipData(updateData, true);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Please correct the internship details.",
        errors,
      });
    }

    // Sanitize strings
    if (updateData.title !== undefined) {
      updateData.title = cleanString(updateData.title, 200);
    }

    if (updateData.department !== undefined) {
      updateData.department = cleanString(updateData.department, 150);
    }

    if (updateData.location !== undefined) {
      updateData.location = cleanString(updateData.location, 150);
    }

    if (updateData.duration !== undefined) {
      updateData.duration = cleanString(updateData.duration, 100);
    }

    if (updateData.stipend !== undefined) {
      updateData.stipend = cleanString(updateData.stipend, 100);
    }

    if (updateData.description !== undefined) {
      updateData.description = cleanString(updateData.description, 10000);
    }

    if (updateData.internshipType !== undefined) {
      if (!allowedInternshipTypes.includes(updateData.internshipType)) {
        return res.status(400).json({
          success: false,
          message: "Invalid internship type.",
        });
      }
    }

    if (updateData.responsibilities !== undefined) {
      updateData.responsibilities = cleanStringArray(
        updateData.responsibilities
      );
    }

    if (updateData.requirements !== undefined) {
      updateData.requirements = cleanStringArray(
        updateData.requirements
      );
    }

    if (updateData.skills !== undefined) {
      updateData.skills = cleanStringArray(updateData.skills);
    }

    if (updateData.openings !== undefined) {
      const openings = parseOpenings(updateData.openings);

      if (openings === null) {
        return res.status(400).json({
          success: false,
          message: "Invalid openings value.",
        });
      }

      updateData.openings = openings;
    }

    if (updateData.applicationDeadline !== undefined) {
      const deadline = new Date(updateData.applicationDeadline);

      if (Number.isNaN(deadline.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid application deadline.",
        });
      }

      updateData.applicationDeadline = deadline;
    }

    if (updateData.status !== undefined) {
      if (!allowedStatuses.includes(updateData.status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid internship status.",
        });
      }
    }

    if (updateData.isFeatured !== undefined) {
      updateData.isFeatured = parseBoolean(updateData.isFeatured);
    }

    const internship = await Internship.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Internship updated successfully.",
      data: internship,
    });
  } catch (error) {
    console.error("❌ Update Internship Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update internship.",
    });
  }
};

// ================= ADMIN: DELETE INTERNSHIP =================

const deleteInternship = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid internship ID.",
      });
    }

    const internship = await Internship.findByIdAndDelete(id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Internship deleted successfully.",
    });
  } catch (error) {
    console.error("❌ Delete Internship Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete internship.",
    });
  }
};

// ================= EXPORTS =================

module.exports = {
  createInternship,
  getOpenInternships,
  getInternshipById,
  getAllInternships,
  updateInternship,
  deleteInternship,
};