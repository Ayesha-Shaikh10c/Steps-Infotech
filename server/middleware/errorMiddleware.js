// ==================================================
// GLOBAL ERROR HANDLER
// ==================================================

const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", {
    name: err.name,
    message: err.message,
    code: err.code,
    method: req.method,
    url: req.originalUrl,
  });

  // -----------------------------------------------
  // MULTER FILE SIZE ERROR
  // -----------------------------------------------

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File size is too large.",
    });
  }

  // -----------------------------------------------
  // MULTER ERROR
  // -----------------------------------------------

  if (err.name === "MulterError") {
    const multerMessages = {
      LIMIT_FILE_COUNT: "Too many files uploaded.",
      LIMIT_UNEXPECTED_FILE: "Unexpected file uploaded.",
      LIMIT_FIELD_KEY: "Field name is too long.",
      LIMIT_FIELD_VALUE: "Field value is too long.",
      LIMIT_FIELD_COUNT: "Too many form fields.",
      LIMIT_PART_COUNT: "Too many form parts.",
    };

    return res.status(400).json({
      success: false,
      message:
        multerMessages[err.code] ||
        "Invalid file upload.",
    });
  }

  // -----------------------------------------------
  // MONGOOSE VALIDATION ERROR
  // -----------------------------------------------

  if (err.name === "ValidationError") {
    const errors = {};

    Object.keys(err.errors).forEach((field) => {
      errors[field] = err.errors[field].message;
    });

    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors,
    });
  }

  // -----------------------------------------------
  // MONGOOSE CAST ERROR
  // -----------------------------------------------

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID or data format.",
    });
  }

  // -----------------------------------------------
  // DUPLICATE KEY ERROR
  // -----------------------------------------------

  if (err.code === 11000) {
    const duplicateFields = Object.keys(
      err.keyValue || {}
    );

    const duplicateField =
      duplicateFields[0];

    const fieldMessages = {
      email: "Email already exists.",
      phone: "Phone number already exists.",
      role: "This role is already assigned.",
    };

    return res.status(409).json({
      success: false,
      message:
        fieldMessages[duplicateField] ||
        "Duplicate data already exists.",
    });
  }

  // -----------------------------------------------
  // JWT ERRORS
  // -----------------------------------------------

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token.",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Authentication token has expired.",
    });
  }

  // -----------------------------------------------
  // CORS ERROR
  // -----------------------------------------------

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "Request origin is not allowed.",
    });
  }

  // -----------------------------------------------
  // DEFAULT ERROR
  // -----------------------------------------------

  const statusCode =
    Number.isInteger(err.statusCode) &&
    err.statusCode >= 400 &&
    err.statusCode < 600
      ? err.statusCode
      : 500;

  return res.status(statusCode).json({
    success: false,
    message:
      statusCode >= 500
        ? "Internal server error."
        : err.isOperational
          ? err.message
          : "Request could not be completed.",
  });
};

// ==================================================
// 404 NOT FOUND
// ==================================================

const notFound = (req, res) => {
  return res.status(404).json({
    success: false,
    message: "The requested resource was not found.",
  });
};

// ==================================================
// EXPORT
// ==================================================

module.exports = {
  errorHandler,
  notFound,
};