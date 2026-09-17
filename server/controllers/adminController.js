const mongoose = require("mongoose");
const User = require("../models/User");
const { getSafeUser } = require("../utils/userResponse");

// ==================================================
// HELPERS
// ==================================================

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const isSameUser = (userId, currentUserId) => {
  return (
    userId?.toString() === currentUserId?.toString()
  );
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

// ==================================================
// GET ALL USERS - ADMIN
// GET /api/admin/users
// ==================================================

const getAllUsers = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req);

    const [users, total] = await Promise.all([
      User.find()
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      User.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      count: users.length,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      users: users.map((user) => getSafeUser(user)),
    });
  } catch (error) {
    console.error("Get All Users Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to get users.",
    });
  }
};

// ==================================================
// GET USER BY ID - ADMIN
// GET /api/admin/users/:id
// ==================================================

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID.",
      });
    }

    const user = await User.findById(id)
      .select("-password")
      .lean();

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
    console.error("Get User Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to get user.",
    });
  }
};

// ==================================================
// ADMIN UPDATE USER
// PUT /api/admin/users/:id
// ==================================================

const adminUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID.",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // --------------------------------------------------
    // NEVER allow role changes
    // --------------------------------------------------

    if (body.role !== undefined) {
      return res.status(403).json({
        success: false,
        message: "User role cannot be changed.",
      });
    }

    // --------------------------------------------------
    // NEVER modify the admin through user management
    // --------------------------------------------------

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message:
          "Admin account cannot be modified through user management.",
      });
    }

    // --------------------------------------------------
    // Admin cannot modify himself
    // --------------------------------------------------

    if (isSameUser(user._id, req.user._id)) {
      return res.status(400).json({
        success: false,
        message:
          "You cannot modify your own account from this route.",
      });
    }

    // --------------------------------------------------
    // Only explicitly allowed fields can be updated
    // --------------------------------------------------

    const allowedFields = [
      "fullName",
      "phone",
      "status",
      "isVerified",
      "bio",
      "address",
      "city",
      "state",
      "country",
      "pincode",
      "skills",
    ];

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        user[field] = body[field];
      }
    });

    // --------------------------------------------------
    // Validate status
    // --------------------------------------------------

    if (
      user.status !== undefined &&
      !["pending", "active", "blocked"].includes(
        user.status
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid user status.",
      });
    }

    // --------------------------------------------------
    // Blocked users cannot remain verified
    // --------------------------------------------------

    if (user.status === "blocked") {
      user.isVerified = false;
    }

    // --------------------------------------------------
    // Pending users cannot be verified
    // --------------------------------------------------

    if (user.status === "pending") {
      user.isVerified = false;
    }

    // --------------------------------------------------
    // Normalize string fields
    // --------------------------------------------------

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

    stringFields.forEach((field) => {
      if (typeof user[field] === "string") {
        user[field] = user[field].trim();
      }
    });

    // --------------------------------------------------
    // Save
    // --------------------------------------------------

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user: getSafeUser(updatedUser),
    });
  } catch (error) {
    console.error("Admin Update User Error:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to update user.",
    });
  }
};

// ==================================================
// APPROVE USER - ADMIN
// PUT /api/admin/users/:id/approve
// ==================================================

const approveUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID.",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin account cannot be approved.",
      });
    }

    if (
      user.status === "active" &&
      user.isVerified === true
    ) {
      return res.status(400).json({
        success: false,
        message: "User is already approved.",
      });
    }

    user.status = "active";
    user.isVerified = true;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User approved successfully.",
      user: getSafeUser(user),
    });
  } catch (error) {
    console.error("Approve User Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to approve user.",
    });
  }
};

// ==================================================
// REJECT USER - ADMIN
// PUT /api/admin/users/:id/reject
// ==================================================

const rejectUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID.",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin account cannot be rejected.",
      });
    }

    user.status = "blocked";
    user.isVerified = false;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User rejected successfully.",
      user: getSafeUser(user),
    });
  } catch (error) {
    console.error("Reject User Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to reject user.",
    });
  }
};

// ==================================================
// BLOCK USER - ADMIN
// PUT /api/admin/users/:id/block
// ==================================================

const blockUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID.",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // --------------------------------------------------
    // Admin cannot block himself
    // --------------------------------------------------

    if (isSameUser(user._id, req.user._id)) {
      return res.status(400).json({
        success: false,
        message: "You cannot block your own account.",
      });
    }

    // --------------------------------------------------
    // Admin account protection
    // --------------------------------------------------

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin account cannot be blocked.",
      });
    }

    if (user.status === "blocked") {
      return res.status(400).json({
        success: false,
        message: "User is already blocked.",
      });
    }

    user.status = "blocked";
    user.isVerified = false;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User blocked successfully.",
      user: getSafeUser(user),
    });
  } catch (error) {
    console.error("Block User Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to block user.",
    });
  }
};

// ==================================================
// UNBLOCK USER - ADMIN
// PUT /api/admin/users/:id/unblock
// ==================================================

const unblockUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID.",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin account cannot be unblocked.",
      });
    }

    user.status = "active";
    user.isVerified = true;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User unblocked successfully.",
      user: getSafeUser(user),
    });
  } catch (error) {
    console.error("Unblock User Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to unblock user.",
    });
  }
};

// ==================================================
// DELETE USER - ADMIN
// DELETE /api/admin/users/:id
// ==================================================

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID.",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // --------------------------------------------------
    // Admin cannot delete himself
    // --------------------------------------------------

    if (isSameUser(user._id, req.user._id)) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account.",
      });
    }

    // --------------------------------------------------
    // Admin account protection
    // --------------------------------------------------

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin account cannot be deleted.",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    console.error("Delete User Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to delete user.",
    });
  }
};

// ==================================================
// EXPORTS
// ==================================================

module.exports = {
  getAllUsers,
  getUserById,
  adminUpdateUser,
  approveUser,
  rejectUser,
  blockUser,
  unblockUser,
  deleteUser,
};