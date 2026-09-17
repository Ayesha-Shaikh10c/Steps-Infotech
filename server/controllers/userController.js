const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const {
  validateRegister,
  validatePassword,
} = require("../validations/userValidation");

const {
  getSafeUser,
} = require("../utils/userResponse");

// ==================================================
// REGISTER USER
// POST /api/users/register
// ==================================================

const registerUser = async (req, res) => {
  try {
    const body = req.body || {};

    let {
      fullName,
      email,
      password,
      phone,
    } = body;

    // ==================================================
    // VALIDATION
    // ==================================================

    const errors = validateRegister({
      fullName,
      email,
      password,
      phone,
    });

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    // ==================================================
    // CLEAN INPUT
    // ==================================================

    fullName = fullName.trim();
    email = email.trim().toLowerCase();
    phone = typeof phone === "string"
      ? phone.trim()
      : "";

    // ==================================================
    // CHECK EXISTING USER
    // ==================================================

    const existingUser = await User.findOne({
      email,
    }).select("_id");

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }

    // ==================================================
    // HASH PASSWORD
    // ==================================================

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    // ==================================================
    // CREATE USER
    // ==================================================

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,

      // Public registration can ONLY create normal users.
      role: "user",

      // New users require admin approval.
      status: "pending",

      // Verification happens after approval.
      isVerified: false,
    });

    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(201).json({
      success: true,
      message:
        "Registration successful. Your account is pending admin approval.",
      data: getSafeUser(user),
    });
  } catch (error) {
    console.error("Register Error:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    // ==================================================
    // DUPLICATE KEY
    // ==================================================

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }

    // ==================================================
    // MONGOOSE VALIDATION
    // ==================================================

    if (error.name === "ValidationError") {
      const errors = {};

      Object.keys(error.errors).forEach((field) => {
        errors[field] = error.errors[field].message;
      });

      return res.status(400).json({
        success: false,
        errors,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong during registration.",
    });
  }
};

// ==================================================
// LOGIN USER
// POST /api/users/login
// ==================================================

const loginUser = async (req, res) => {
  try {
    const body = req.body || {};

    let {
      email,
      password,
    } = body;

    // ==================================================
    // REQUIRED
    // ==================================================

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // ==================================================
    // VALIDATE PASSWORD
    // ==================================================

    const passwordError =
      validatePassword(password);

    if (passwordError) {
      return res.status(400).json({
        success: false,
        message: passwordError,
      });
    }

    // ==================================================
    // CLEAN EMAIL
    // ==================================================

    email = email.trim().toLowerCase();

    // ==================================================
    // JWT CONFIG CHECK
    // ==================================================

    if (!process.env.JWT_SECRET) {
      console.error(
        "JWT_SECRET is not configured."
      );

      return res.status(500).json({
        success: false,
        message:
          "Authentication service is not configured.",
      });
    }

    // ==================================================
    // FIND USER
    // ==================================================

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // ==================================================
    // BLOCKED USER
    // ==================================================

    if (user.status === "blocked") {
      return res.status(403).json({
        success: false,
        message:
          "Your account has been blocked. Please contact admin.",
      });
    }

    // ==================================================
    // PENDING USER
    // ==================================================

    if (user.status === "pending") {
      return res.status(403).json({
        success: false,
        message:
          "Your account is waiting for admin approval. You cannot login yet.",
      });
    }

    // ==================================================
    // ACTIVE CHECK
    // ==================================================

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message:
          "Your account is not active.",
      });
    }

    // ==================================================
    // PASSWORD CHECK
    // ==================================================

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // ==================================================
    // JWT
    // ==================================================

    const token = jwt.sign(
      {
        id: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn:
          process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    // ==================================================
    // LAST LOGIN
    // ==================================================

    const lastLogin = new Date();

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          lastLogin,
        },
      }
    );

    user.lastLogin = lastLogin;

    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: getSafeUser(user),
    });
  } catch (error) {
    console.error("Login Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong during login.",
    });
  }
};

// ==================================================
// GET PROFILE
// GET /api/users/profile
// ==================================================

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user._id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user: getSafeUser(user),
    });
  } catch (error) {
    console.error("Get Profile Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to get profile.",
    });
  }
};

// ==================================================
// UPDATE OWN PROFILE
// PUT /api/users/profile
// ==================================================

const updateOwnProfile = async (req, res) => {
  try {
    const body = req.body || {};

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ==================================================
    // PROTECT SYSTEM FIELDS
    // ==================================================

    const protectedFields = [
      "password",
      "role",
      "status",
      "isVerified",
      "email",
    ];

    for (const field of protectedFields) {
      if (body[field] !== undefined) {
        return res.status(403).json({
          success: false,
          message:
            `${field} cannot be changed by user.`,
        });
      }
    }

    // ==================================================
    // ALLOWED FIELDS
    // ==================================================

    const allowedFields = [
      "fullName",
      "phone",
      "bio",
      "address",
      "city",
      "state",
      "country",
      "pincode",
      "skills",
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        user[field] = body[field];
      }
    }

    // ==================================================
    // TRIM STRING FIELDS
    // ==================================================

    const stringFields = [
      "fullName",
      "phone",
      "bio",
      "address",
      "city",
      "state",
      "country",
      "pincode",
    ];

    for (const field of stringFields) {
      if (typeof user[field] === "string") {
        user[field] = user[field].trim();
      }
    }

    // ==================================================
    // SKILLS NORMALIZATION
    // ==================================================

    if (body.skills !== undefined) {
      if (!Array.isArray(body.skills)) {
        return res.status(400).json({
          success: false,
          message: "Skills must be an array.",
        });
      }

      user.skills = body.skills
        .filter(
          (skill) =>
            typeof skill === "string"
        )
        .map((skill) => skill.trim())
        .filter(Boolean);
    }

    // ==================================================
    // SAVE
    // ==================================================

    const updatedUser = await user.save();

    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(200).json({
      success: true,
      message:
        "Profile updated successfully.",
      user: getSafeUser(updatedUser),
    });
  } catch (error) {
    console.error(
      "Update Own Profile Error:",
      {
        name: error.name,
        message: error.message,
        code: error.code,
      }
    );

    if (error.name === "ValidationError") {
      const errors = {};

      Object.keys(error.errors).forEach(
        (field) => {
          errors[field] =
            error.errors[field].message;
        }
      );

      return res.status(400).json({
        success: false,
        errors,
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A unique field value already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Unable to update profile.",
    });
  }
};

// ==================================================
// CHANGE PASSWORD
// PUT /api/users/change-password
// ==================================================

const changePassword = async (req, res) => {
  try {
    const body = req.body || {};

    const {
      currentPassword,
      newPassword,
    } = body;

    // ==================================================
    // REQUIRED
    // ==================================================

    if (
      typeof currentPassword !== "string" ||
      typeof newPassword !== "string" ||
      !currentPassword ||
      !newPassword
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Current password and new password are required.",
      });
    }

    // ==================================================
    // VALIDATE NEW PASSWORD
    // ==================================================

    const passwordError =
      validatePassword(newPassword);

    if (passwordError) {
      return res.status(400).json({
        success: false,
        message: passwordError,
      });
    }

    // ==================================================
    // FIND USER
    // ==================================================

    const user = await User.findById(
      req.user._id
    ).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ==================================================
    // CURRENT PASSWORD CHECK
    // ==================================================

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Current password is incorrect.",
      });
    }

    // ==================================================
    // PREVENT SAME PASSWORD
    // ==================================================

    const samePassword =
      await bcrypt.compare(
        newPassword,
        user.password
      );

    if (samePassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be different from your current password.",
      });
    }

    // ==================================================
    // HASH NEW PASSWORD
    // ==================================================

    user.password = await bcrypt.hash(
      newPassword,
      12
    );

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password changed successfully.",
    });
  } catch (error) {
    console.error(
      "Change Password Error:",
      {
        name: error.name,
        message: error.message,
      }
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to change password.",
    });
  }
};

// ==================================================
// UPLOAD PROFILE IMAGE
// PUT /api/users/upload-profile
// ==================================================

const uploadProfileImage = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ==================================================
    // CHECK FILE
    // ==================================================

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please select a valid image.",
      });
    }

    // ==================================================
    // SAVE IMAGE PATH
    // ==================================================

    user.profileImage =
      `/uploads/profile/${req.file.filename}`;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Profile image uploaded successfully.",
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error(
      "Profile Upload Error:",
      {
        name: error.name,
        message: error.message,
      }
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to upload profile image.",
    });
  }
};

// ==================================================
// UPLOAD RESUME
// PUT /api/users/upload-resume
// ==================================================

const uploadResume = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ==================================================
    // CHECK FILE
    // ==================================================

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please select a valid PDF resume.",
      });
    }

    // ==================================================
    // SAVE RESUME PATH
    // ==================================================

    user.resume =
      `/uploads/resume/${req.file.filename}`;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Resume uploaded successfully.",
      resume: user.resume,
    });
  } catch (error) {
    console.error(
      "Resume Upload Error:",
      {
        name: error.name,
        message: error.message,
      }
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to upload resume.",
    });
  }
};

// ==================================================
// ADMIN FUNCTIONS
// ==================================================
// NOTE:
// Admin user-management functions remain in
// adminController.js.
// ==================================================

module.exports = {
  // USER
  registerUser,
  loginUser,
  getProfile,
  updateOwnProfile,
  changePassword,
  uploadProfileImage,
  uploadResume,
};