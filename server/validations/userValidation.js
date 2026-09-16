const validator = require("validator");

// ==================================================
// REGISTER VALIDATION
// ==================================================

const validateRegister = ({ fullName, email, password, phone }) => {
  const errors = {};

  // --------------------------------------------------
  // Full Name
  // --------------------------------------------------

  if (!fullName || typeof fullName !== "string") {
    errors.fullName = "Full name is required";
  } else {
    const name = fullName.trim();

    if (name.length < 2) {
      errors.fullName = "Full name must be at least 2 characters";
    } else if (name.length > 100) {
      errors.fullName = "Full name cannot exceed 100 characters";
    }
  }

  // --------------------------------------------------
  // Email
  // --------------------------------------------------

  if (!email || typeof email !== "string") {
    errors.email = "Email is required";
  } else {
    const normalizedEmail = email.trim().toLowerCase();

    if (!validator.isEmail(normalizedEmail)) {
      errors.email = "Valid email is required";
    } else if (normalizedEmail.length > 150) {
      errors.email = "Email cannot exceed 150 characters";
    }
  }

  // --------------------------------------------------
  // Password
  // --------------------------------------------------

  const passwordError = validatePassword(password);

  if (passwordError) {
    errors.password = passwordError;
  }

  // --------------------------------------------------
  // Phone - Optional
  // --------------------------------------------------

  if (phone !== undefined && phone !== null && phone !== "") {
    if (typeof phone !== "string") {
      errors.phone = "Phone number must be valid";
    } else {
      const cleanPhone = phone.trim();

      if (!/^[0-9+\-\s()]{7,20}$/.test(cleanPhone)) {
        errors.phone = "Invalid phone number";
      }
    }
  }

  return errors;
};

// ==================================================
// PASSWORD VALIDATION
// ==================================================

const validatePassword = (password) => {
  if (!password || typeof password !== "string") {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  if (password.length > 128) {
    return "Password cannot exceed 128 characters";
  }

  return null;
};

// ==================================================
// EXPORT
// ==================================================

module.exports = {
  validateRegister,
  validatePassword,
};