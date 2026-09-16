const mongoose = require("mongoose");

// ==================================================
// USER SCHEMA
// ==================================================

const userSchema = new mongoose.Schema(
  {
    // ==================================================
    // USER BASIC DETAILS
    // ==================================================

    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [150, "Email cannot exceed 150 characters"],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
      validate: {
        validator: function (value) {
          if (!value) return true;
          return /^[0-9+\-\s()]{7,20}$/.test(value);
        },
        message: "Please enter a valid phone number",
      },
    },

    // ==================================================
    // ROLE
    // ==================================================

    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "Role must be either admin or user",
      },
      default: "user",
      index: true,
    },

    // ==================================================
    // ACCOUNT STATUS
    // ==================================================

    // pending = registered but waiting for admin approval
    // active  = approved and can login
    // blocked = blocked by admin

    status: {
      type: String,
      enum: {
        values: ["pending", "active", "blocked"],
        message: "Status must be pending, active, or blocked",
      },
      default: "pending",
      index: true,
    },

    // ==================================================
    // PROFILE
    // ==================================================

    profileImage: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Profile image path cannot exceed 500 characters"],
    },

    resume: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Resume path cannot exceed 500 characters"],
    },

    bio: {
      type: String,
      default: "",
      trim: true,
      maxlength: [1000, "Bio cannot exceed 1000 characters"],
    },

    skills: {
      type: [
        {
          type: String,
          trim: true,
          maxlength: [
            50,
            "Each skill cannot exceed 50 characters",
          ],
        },
      ],
      default: [],
      validate: {
        validator: function (skills) {
          if (!Array.isArray(skills)) return false;

          const normalizedSkills = skills
            .map((skill) => String(skill).trim().toLowerCase())
            .filter(Boolean);

          return new Set(normalizedSkills).size === normalizedSkills.length;
        },
        message: "Skills must not contain duplicates",
      },
    },

    // ==================================================
    // ADDRESS
    // ==================================================

    address: {
      type: String,
      default: "",
      trim: true,
      maxlength: [
        300,
        "Address cannot exceed 300 characters",
      ],
    },

    city: {
      type: String,
      default: "",
      trim: true,
      maxlength: [
        100,
        "City cannot exceed 100 characters",
      ],
    },

    state: {
      type: String,
      default: "",
      trim: true,
      maxlength: [
        100,
        "State cannot exceed 100 characters",
      ],
    },

    country: {
      type: String,
      default: "India",
      trim: true,
      maxlength: [
        100,
        "Country cannot exceed 100 characters",
      ],
    },

    pincode: {
      type: String,
      default: "",
      trim: true,
      maxlength: [
        10,
        "Pincode cannot exceed 10 characters",
      ],
      validate: {
        validator: function (value) {
          if (!value) return true;

          return /^\d{6}$/.test(value);
        },
        message: "Please enter a valid 6-digit pincode",
      },
    },

    // ==================================================
    // ACCOUNT VERIFICATION
    // ==================================================

    isVerified: {
      type: Boolean,
      default: false,
      index: true,
    },

    // ==================================================
    // LOGIN INFORMATION
    // ==================================================

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// ==================================================
// INDEXES
// ==================================================

// Useful for admin/user filtering.
userSchema.index({
  role: 1,
  status: 1,
});

// ==================================================
// SINGLE ADMIN PROTECTION
// ==================================================
//
// Only ONE document can have role = "admin".
// User accounts are unaffected.
//
// IMPORTANT:
// This is enforced at MongoDB index level, not only
// inside controller code.
//

userSchema.index(
  { role: 1 },
  {
    unique: true,
    partialFilterExpression: {
      role: "admin",
    },
    name: "single_admin_account",
  }
);

// ==================================================
// NORMALIZE SKILLS BEFORE SAVE
// ==================================================

userSchema.pre("save", function () {
  if (!this.isModified("skills") || !Array.isArray(this.skills)) {
    return;
  }

  this.skills = [
    ...new Set(
      this.skills
        .filter((skill) => typeof skill === "string")
        .map((skill) => skill.trim())
        .filter(Boolean)
    ),
  ];
});

// ==================================================
// MODEL
// ==================================================

const User = mongoose.model("User", userSchema);

module.exports = User;