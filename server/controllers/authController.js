const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  validateRegister,
  validatePassword,
} = require("../validations/userValidation");

const { getSafeUser } = require("../utils/userResponse");

// ==================================================
// REGISTER USER
// POST /api/users/register
// ==================================================

const registerUser = async (req, res) => {
  try {
    let {
      fullName,
      email,
      password,
      phone,
    } = req.body || {};

    // ==================================================
    // TYPE CHECK
    // ==================================================

    if (
      typeof fullName !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Full name, email and password are required",
      });
    }

    // ==================================================
    // REQUIRED FIELDS
    // ==================================================

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Full name, email and password are required",
      });
    }

    // ==================================================
    // CLEAN INPUT
    // ==================================================

    fullName = fullName.trim();
    email = email.trim().toLowerCase();

    if (typeof phone !== "string") {
      phone = "";
    } else {
      phone = phone.trim();
    }

    // IMPORTANT:
    // Password is intentionally NOT trimmed.
    // Spaces can be a valid part of a password.

    // ==================================================
    // CUSTOM VALIDATION
    // ==================================================

    const errors = validateRegister({
      fullName,
      email,
      password,
      phone,
    });

    // Extra password validation safety.
    if (!errors.password) {
      const passwordError = validatePassword(password);

      if (passwordError) {
        errors.password = passwordError;
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    // ==================================================
    // CHECK EXISTING USER
    // ==================================================

    const existingUser = await User.findOne({
      email,
    }).select("_id");

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
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
    //
    // PUBLIC REGISTRATION CAN ONLY CREATE:
    //
    // role        = user
    // status      = pending
    // isVerified  = false
    //
    // There is NO req.body role accepted here.
    //
    // Therefore a public user cannot register as admin.
    //
    // ==================================================

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,

      role: "user",
      status: "pending",
      isVerified: false,
    });

    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(201).json({
      success: true,
      message:
        "Registration successful. Your account is waiting for admin approval.",

      data: getSafeUser(user),
    });
  } catch (error) {
    console.error("Register Error:", error);

    // ==================================================
    // DUPLICATE KEY
    // ==================================================

    if (error?.code === 11000) {
      const duplicateField =
        Object.keys(error.keyPattern || {})[0];

      if (duplicateField === "email") {
        return res.status(409).json({
          success: false,
          message: "Email is already registered",
        });
      }

      return res.status(409).json({
        success: false,
        message: "The account could not be created.",
      });
    }

    // ==================================================
    // MONGOOSE VALIDATION ERROR
    // ==================================================

    if (error?.name === "ValidationError") {
      const errors = {};

      Object.keys(error.errors || {}).forEach(
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

    // ==================================================
    // SERVER ERROR
    // ==================================================

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
    let {
      email,
      password,
    } = req.body || {};

    // ==================================================
    // TYPE CHECK
    // ==================================================

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Email and Password are required",
      });
    }

    // ==================================================
    // REQUIRED FIELDS
    // ==================================================

    if (
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Email and Password are required",
      });
    }

    // ==================================================
    // CLEAN EMAIL
    // ==================================================

    email = email.trim().toLowerCase();

    // ==================================================
    // PASSWORD VALIDATION
    // ==================================================

    const passwordError =
      validatePassword(password);

    if (passwordError) {
      return res.status(400).json({
        success: false,
        errors: {
          password: passwordError,
        },
      });
    }

    // ==================================================
    // FIND USER
    // ==================================================

    const user = await User.findOne({
      email,
    }).select("+password");

    // ==================================================
    // USER NOT FOUND
    // ==================================================

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid Email or Password",
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
    // PENDING APPROVAL
    // ==================================================

    if (user.status === "pending") {
      return res.status(403).json({
        success: false,
        message:
          "Your account is waiting for admin approval. You cannot login yet.",
      });
    }

    // ==================================================
    // ONLY ACTIVE USERS CAN LOGIN
    // ==================================================

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message:
          "Your account is not active. Please contact admin.",
      });
    }

    // ==================================================
    // PASSWORD CHECK
    // ==================================================

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid Email or Password",
      });
    }

    // ==================================================
    // JWT SECRET CHECK
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
    // JWT TOKEN
    // ==================================================

    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn:
          process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    // ==================================================
    // UPDATE LAST LOGIN
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

    // Keep response object synchronized.
    user.lastLogin = lastLogin;

    // ==================================================
    // SAFE USER RESPONSE
    // ==================================================

    const safeUser = getSafeUser(user);

    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("Login Error:", error);

    // ==================================================
    // SERVER ERROR
    // ==================================================

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong during login.",
    });
  }
};

// ==================================================
// EXPORTS
// ==================================================

module.exports = {
  registerUser,
  loginUser,
};