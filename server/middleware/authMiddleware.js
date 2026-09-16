const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ==================================================
// PROTECT MIDDLEWARE
// Verify JWT token and attach fresh user to req.user
// ==================================================

const protect = async (req, res, next) => {
  try {
    // --------------------------------------------------
    // Check JWT secret configuration
    // --------------------------------------------------
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is not configured.");
      return res.status(500).json({
        success: false,
        message: "Authentication service is not configured.",
      });
    }

    // --------------------------------------------------
    // Read Authorization header
    // --------------------------------------------------
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      typeof authHeader !== "string" ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // --------------------------------------------------
    // Extract token safely
    // --------------------------------------------------
    const token = authHeader.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    // --------------------------------------------------
    // Verify JWT
    // --------------------------------------------------
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // --------------------------------------------------
    // Validate token payload
    // --------------------------------------------------
    if (
      !decoded ||
      typeof decoded !== "object" ||
      !decoded.id
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    // --------------------------------------------------
    // Find fresh user from database
    // Never trust role/status from JWT alone
    // --------------------------------------------------
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed.",
      });
    }

    // --------------------------------------------------
    // Blocked users cannot access protected routes
    // --------------------------------------------------
    if (user.status === "blocked") {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked.",
      });
    }

    // --------------------------------------------------
    // Attach fresh database user
    // --------------------------------------------------
    req.user = user;

    next();
  } catch (error) {
    console.error("❌ Protect Middleware Error:", {
      name: error.name,
      message: error.message,
    });

    // --------------------------------------------------
    // JWT expired
    // --------------------------------------------------
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    // --------------------------------------------------
    // Invalid JWT
    // --------------------------------------------------
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    // --------------------------------------------------
    // Invalid token configuration / other auth failures
    // --------------------------------------------------
    return res.status(401).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};

module.exports = protect;