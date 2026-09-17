const mongoose = require("mongoose");
const JobPosting = require("../models/JobPosting");

// ==================================================
// HELPERS
// ==================================================

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const getPagination = (req) => {
  const page = Math.max(
    Number.parseInt(req.query.page, 10) || 1,
    1
  );

  const limit = Math.min(
    Math.max(
      Number.parseInt(req.query.limit, 10) || 20,
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

const allowedStatuses = [
  "open",
  "closed",
  "draft",
];

const validateJobData = (data, isUpdate = false) => {
  const errors = {};

  const requiredFields = [
    "title",
    "department",
    "location",
    "employmentType",
    "description",
  ];

  if (!isUpdate) {
    requiredFields.forEach((field) => {
      if (
        data[field] === undefined ||
        data[field] === null ||
        (typeof data[field] === "string" &&
          !data[field].trim())
      ) {
        errors[field] = `${field} is required`;
      }
    });
  }

  if (
    data.title !== undefined &&
    (typeof data.title !== "string" ||
      data.title.trim().length < 2 ||
      data.title.trim().length > 150)
  ) {
    errors.title = "Title must be between 2 and 150 characters";
  }

  if (
    data.department !== undefined &&
    (typeof data.department !== "string" ||
      data.department.trim().length < 2 ||
      data.department.trim().length > 100)
  ) {
    errors.department =
      "Department must be between 2 and 100 characters";
  }

  if (
    data.location !== undefined &&
    (typeof data.location !== "string" ||
      data.location.trim().length < 2 ||
      data.location.trim().length > 150)
  ) {
    errors.location =
      "Location must be between 2 and 150 characters";
  }

  if (
    data.employmentType !== undefined &&
    (typeof data.employmentType !== "string" ||
      data.employmentType.trim().length < 2 ||
      data.employmentType.trim().length > 50)
  ) {
    errors.employmentType =
      "Employment type is invalid";
  }

  if (
    data.description !== undefined &&
    (typeof data.description !== "string" ||
      data.description.trim().length < 10 ||
      data.description.trim().length > 10000)
  ) {
    errors.description =
      "Description must be between 10 and 10000 characters";
  }

  if (
    data.status !== undefined &&
    !allowedStatuses.includes(data.status)
  ) {
    errors.status =
      "Status must be open, closed or draft";
  }

  if (data.openings !== undefined) {
    const openings = Number(data.openings);

    if (
      !Number.isInteger(openings) ||
      openings < 1 ||
      openings > 10000
    ) {
      errors.openings =
        "Openings must be a whole number between 1 and 10000";
    }
  }

  if (data.isFeatured !== undefined) {
    if (typeof data.isFeatured !== "boolean") {
      errors.isFeatured =
        "isFeatured must be a boolean value";
    }
  }

  if (data.applicationDeadline !== undefined) {
    const deadline = new Date(
      data.applicationDeadline
    );

    if (Number.isNaN(deadline.getTime())) {
      errors.applicationDeadline =
        "Invalid application deadline";
    }
  }

  return errors;
};

const sanitizeJobData = (data) => {
  const cleaned = { ...data };

  const stringFields = [
    "title",
    "department",
    "location",
    "employmentType",
    "experience",
    "salary",
    "description",
  ];

  stringFields.forEach((field) => {
    if (typeof cleaned[field] === "string") {
      cleaned[field] = cleaned[field].trim();
    }
  });

  if (Array.isArray(cleaned.skills)) {
    cleaned.skills = [
      ...new Set(
        cleaned.skills
          .filter(
            (skill) => typeof skill === "string"
          )
          .map((skill) => skill.trim())
          .filter(Boolean)
      ),
    ];
  }

  if (Array.isArray(cleaned.responsibilities)) {
    cleaned.responsibilities =
      cleaned.responsibilities
        .filter(
          (item) => typeof item === "string"
        )
        .map((item) => item.trim())
        .filter(Boolean);
  }

  if (Array.isArray(cleaned.requirements)) {
    cleaned.requirements =
      cleaned.requirements
        .filter(
          (item) => typeof item === "string"
        )
        .map((item) => item.trim())
        .filter(Boolean);
  }

  if (cleaned.openings !== undefined) {
    cleaned.openings = Number(cleaned.openings);
  }

  if (
    cleaned.applicationDeadline !== undefined &&
    cleaned.applicationDeadline !== null &&
    cleaned.applicationDeadline !== ""
  ) {
    cleaned.applicationDeadline = new Date(
      cleaned.applicationDeadline
    );
  }

  return cleaned;
};

// ==================================================
// CREATE JOB
// ==================================================

const createJob = async (req, res) => {
  try {
    const body = req.body || {};

    const errors = validateJobData(body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid job details.",
        errors,
      });
    }

    const cleanedData = sanitizeJobData(body);

    const job = await JobPosting.create({
      ...cleanedData,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully.",
      job,
    });
  } catch (error) {
    console.error("❌ Create Job Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to create job.",
    });
  }
};

// ==================================================
// GET ALL JOBS - ADMIN
// ==================================================

const getAllJobs = async (req, res) => {
  try {
    const { page, limit, skip } =
      getPagination(req);

    const [jobs, total] = await Promise.all([
      JobPosting.find()
        .populate(
          "createdBy",
          "fullName email"
        )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      JobPosting.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      count: jobs.length,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      jobs,
    });
  } catch (error) {
    console.error("❌ Get All Jobs Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to fetch jobs.",
    });
  }
};

// ==================================================
// GET OPEN JOBS - PUBLIC
// ==================================================


const getOpenJobs = async (req, res) => {
  try {
    const filter = {
      status: "open",
    };

    const jobs = await JobPosting.find(filter)
      .select("-createdBy")
      .sort({
        isFeatured: -1,
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      count: jobs.length,
      total: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("❌ Get Open Jobs Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to fetch open jobs.",
    });
  }
};

// ==================================================
// GET SINGLE JOB
// ==================================================

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID.",
      });
    }

    const job = await JobPosting.findOne({
      _id: id,
      status: "open",
    })
      .select("-createdBy")
      .lean();

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("❌ Get Job Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to fetch job.",
    });
  }
};

// ==================================================
// UPDATE JOB - ADMIN
// ==================================================

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID.",
      });
    }

    const job = await JobPosting.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    const allowedFields = [
      "title",
      "department",
      "location",
      "employmentType",
      "experience",
      "salary",
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

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const errors = validateJobData(
      updateData,
      true
    );

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid job details.",
        errors,
      });
    }

    const cleanedData =
      sanitizeJobData(updateData);

    Object.keys(cleanedData).forEach((field) => {
      job[field] = cleanedData[field];
    });

    const updatedJob = await job.save();

    return res.status(200).json({
      success: true,
      message: "Job updated successfully.",
      job: updatedJob,
    });
  } catch (error) {
    console.error("❌ Update Job Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to update job.",
    });
  }
};

// ==================================================
// DELETE JOB - ADMIN
// ==================================================

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID.",
      });
    }

    const job =
      await JobPosting.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    await JobPosting.deleteOne({
      _id: id,
    });

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully.",
    });
  } catch (error) {
    console.error("❌ Delete Job Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to delete job.",
    });
  }
};

// ==================================================
// EXPORT
// ==================================================

module.exports = {
  createJob,
  getAllJobs,
  getOpenJobs,
  getJobById,
  updateJob,
  deleteJob,
};