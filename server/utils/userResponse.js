// ==================================================
// SAFE USER RESPONSE
// ==================================================
//
// Used for authenticated/admin responses.
//
// Only safe user fields are returned.
// Password and other sensitive fields are never exposed.
//

const getSafeUser = (user) => {
  if (!user) {
    return null;
  }

  const userObject =
    typeof user.toObject === "function"
      ? user.toObject()
      : { ...user };

  return {
    id: userObject._id
      ? userObject._id.toString()
      : userObject.id || null,

    fullName: userObject.fullName || "",

    email: userObject.email || "",

    phone: userObject.phone || "",

    role: userObject.role || "user",

    status: userObject.status || "pending",

    profileImage:
      userObject.profileImage || "",

    resume:
      userObject.resume || "",

    skills: Array.isArray(userObject.skills)
      ? userObject.skills
      : [],

    bio:
      userObject.bio || "",

    address:
      userObject.address || "",

    city:
      userObject.city || "",

    state:
      userObject.state || "",

    country:
      userObject.country || "",

    pincode:
      userObject.pincode || "",

    isVerified:
      Boolean(userObject.isVerified),

    lastLogin:
      userObject.lastLogin || null,

    createdAt:
      userObject.createdAt || null,

    updatedAt:
      userObject.updatedAt || null,
  };
};

// ==================================================
// PUBLIC USER RESPONSE
// ==================================================
//
// Used when user information is exposed publicly.
//
// Sensitive/private information is intentionally excluded.
//
// Never return:
// - email
// - phone
// - role
// - status
// - resume
// - address
// - pincode
// - isVerified
// - lastLogin
//

const getPublicUser = (user) => {
  if (!user) {
    return null;
  }

  const userObject =
    typeof user.toObject === "function"
      ? user.toObject()
      : { ...user };

  return {
    id: userObject._id
      ? userObject._id.toString()
      : userObject.id || null,

    fullName:
      userObject.fullName || "",

    profileImage:
      userObject.profileImage || "",

    bio:
      userObject.bio || "",

    city:
      userObject.city || "",

    state:
      userObject.state || "",

    country:
      userObject.country || "",

    skills: Array.isArray(userObject.skills)
      ? userObject.skills
      : [],
  };
};

// ==================================================
// EXPORT
// ==================================================

module.exports = {
  getSafeUser,
  getPublicUser,
};