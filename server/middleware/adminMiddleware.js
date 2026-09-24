// ==================================================
// ADMIN ONLY MIDDLEWARE
// protect middleware must run before this middleware
// ==================================================

const adminOnly = (req, res, next) => {
  try {
    // --------------------------------------------------
    // protect middleware should attach req.user first
    // --------------------------------------------------
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // --------------------------------------------------
    // Only the admin role can access admin routes
    // --------------------------------------------------
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    // --------------------------------------------------
    // Admin authenticated successfully
    // --------------------------------------------------
    next();
  } catch (error) {
    console.error("❌ Admin Middleware Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(403).json({
      success: false,
      message: "Admin access denied.",
    });
  }
};

module.exports = adminOnly;