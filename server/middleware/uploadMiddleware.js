const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

// ==================================================
// UPLOAD DIRECTORIES
// ==================================================

const profileDir = path.join(
  __dirname,
  "../uploads/profile"
);

const resumeDir = path.join(
  __dirname,
  "../uploads/resume"
);

// Create directories automatically
fs.mkdirSync(profileDir, {
  recursive: true,
});

fs.mkdirSync(resumeDir, {
  recursive: true,
});

// ==================================================
// GENERATE SECURE UNIQUE FILE NAME
// ==================================================

const generateFileName = (file) => {
  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  const randomName = crypto
    .randomBytes(16)
    .toString("hex");

  return `${Date.now()}-${randomName}${extension}`;
};

// ==================================================
// PROFILE IMAGE STORAGE
// ==================================================

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, profileDir);
  },

  filename: (req, file, cb) => {
    cb(null, generateFileName(file));
  },
});

// ==================================================
// PROFILE IMAGE UPLOAD
// ==================================================

const profileUpload = multer({
  storage: profileStorage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 1,
    fields: 5,
  },

  fileFilter: (req, file, cb) => {
    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
    ];

    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
    ];

    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    // Extension check
    if (!allowedExtensions.includes(extension)) {
      return cb(
        new Error(
          "Only JPG, JPEG and PNG files are allowed."
        )
      );
    }

    // MIME check
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new Error("Invalid image file type.")
      );
    }

    cb(null, true);
  },
});

// ==================================================
// RESUME STORAGE
// ==================================================

const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resumeDir);
  },

  filename: (req, file, cb) => {
    cb(null, generateFileName(file));
  },
});

// ==================================================
// RESUME UPLOAD
// ==================================================

const resumeUpload = multer({
  storage: resumeStorage,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
    files: 1,
    fields: 5,
  },

  fileFilter: (req, file, cb) => {
    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    // Extension check
    if (extension !== ".pdf") {
      return cb(
        new Error(
          "Only PDF files are allowed."
        )
      );
    }

    // MIME check
    if (file.mimetype !== "application/pdf") {
      return cb(
        new Error(
          "Invalid resume file type."
        )
      );
    }

    cb(null, true);
  },
});

// ==================================================
// EXPORT
// ==================================================

module.exports = {
  profileUpload,
  resumeUpload,
};