const Application = require("../models/Application");
const JobPosting = require("../models/JobPosting");
const Internship = require("../models/Internship");
const User = require("../models/User");

// ==================================================
// USER DASHBOARD
// GET /api/dashboard/user
// ==================================================

const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    // ----------------------------------------------
    // APPLICATION STATS
    // ----------------------------------------------

    const [
      totalApplications,
      pendingApplications,
      shortlistedApplications,
      interviewApplications,
      selectedApplications,
      rejectedApplications,
    ] = await Promise.all([
      Application.countDocuments({
        applicant: userId,
      }),

      Application.countDocuments({
        applicant: userId,
        status: "pending",
      }),

      Application.countDocuments({
        applicant: userId,
        status: "shortlisted",
      }),

      Application.countDocuments({
        applicant: userId,
        status: "interview",
      }),

      Application.countDocuments({
        applicant: userId,
        status: "selected",
      }),

      Application.countDocuments({
        applicant: userId,
        status: "rejected",
      }),
    ]);

    // ----------------------------------------------
    // RECENT APPLICATIONS
    // ----------------------------------------------

    const recentApplications =
      await Application.find({
        applicant: userId,
      })
        .select(
          "job fullName email status appliedAt createdAt"
        )
        .populate(
          "job",
          "title department location employmentType status"
        )
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .lean();

    // ----------------------------------------------
    // AVAILABLE JOBS
    // ----------------------------------------------

    const availableJobs = await JobPosting.countDocuments({
      status: "open",
    });

    // ----------------------------------------------
    // AVAILABLE INTERNSHIPS
    // ----------------------------------------------

    const availableInternships =
      await Internship.countDocuments({
        status: "open",
        $or: [
          {
            applicationDeadline: null,
          },
          {
            applicationDeadline: {
              $gte: new Date(),
            },
          },
        ],
      });

    // ----------------------------------------------
    // RESPONSE
    // ----------------------------------------------

    return res.status(200).json({
      success: true,

      data: {
        stats: {
          totalApplications,
          pendingApplications,
          shortlistedApplications,
          interviewApplications,
          selectedApplications,
          rejectedApplications,
          availableJobs,
          availableInternships,
        },

        recentApplications,
      },
    });
  } catch (error) {
    console.error("Get User Dashboard Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to load user dashboard.",
    });
  }
};

// ==================================================
// ADMIN DASHBOARD
// GET /api/dashboard/admin
// ==================================================

const getAdminDashboard = async (req, res) => {
  try {
    // ----------------------------------------------
    // USER STATS
    // ----------------------------------------------

    const [
      totalUsers,
      pendingUsers,
      activeUsers,
      blockedUsers,
      totalJobs,
      openJobs,
      totalInternships,
      openInternships,
      totalApplications,
      pendingApplications,
      shortlistedApplications,
      interviewApplications,
      selectedApplications,
      rejectedApplications,
    ] = await Promise.all([
      User.countDocuments({
        role: "user",
      }),

      User.countDocuments({
        role: "user",
        status: "pending",
      }),

      User.countDocuments({
        role: "user",
        status: "active",
      }),

      User.countDocuments({
        role: "user",
        status: "blocked",
      }),

      JobPosting.countDocuments(),

      JobPosting.countDocuments({
        status: "open",
      }),

      Internship.countDocuments(),

      Internship.countDocuments({
        status: "open",
      }),

      Application.countDocuments(),

      Application.countDocuments({
        status: "pending",
      }),

      Application.countDocuments({
        status: "shortlisted",
      }),

      Application.countDocuments({
        status: "interview",
      }),

      Application.countDocuments({
        status: "selected",
      }),

      Application.countDocuments({
        status: "rejected",
      }),
    ]);

    // ----------------------------------------------
    // RECENT APPLICATIONS
    // ----------------------------------------------

    const recentApplications =
      await Application.find()
        .select(
          "applicant job fullName email status appliedAt createdAt"
        )
        .populate(
          "applicant",
          "fullName email profileImage"
        )
        .populate(
          "job",
          "title department location employmentType"
        )
        .sort({
          createdAt: -1,
        })
        .limit(10)
        .lean();

    // ----------------------------------------------
    // RECENT USERS
    // ----------------------------------------------

    const recentUsers = await User.find({
      role: "user",
    })
      .select(
        "fullName email phone status profileImage createdAt"
      )
      .sort({
        createdAt: -1,
      })
      .limit(10)
      .lean();

    // ----------------------------------------------
    // RESPONSE
    // ----------------------------------------------

    return res.status(200).json({
      success: true,

      data: {
        users: {
          total: totalUsers,
          pending: pendingUsers,
          active: activeUsers,
          blocked: blockedUsers,
        },

        jobs: {
          total: totalJobs,
          open: openJobs,
        },

        internships: {
          total: totalInternships,
          open: openInternships,
        },

        applications: {
          total: totalApplications,
          pending: pendingApplications,
          shortlisted: shortlistedApplications,
          interview: interviewApplications,
          selected: selectedApplications,
          rejected: rejectedApplications,
        },

        recentApplications,
        recentUsers,
      },
    });
  } catch (error) {
    console.error("Get Admin Dashboard Error:", {
      name: error.name,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Unable to load admin dashboard.",
    });
  }
};

// ==================================================
// EXPORTS
// ==================================================

module.exports = {
  getUserDashboard,
  getAdminDashboard,
};