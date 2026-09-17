const mongoose = require("mongoose");
const validator = require("validator");
const Contact = require("../models/Contact");

// ==================================================
// HELPERS
// ==================================================

const isValidObjectId = (id) =>
  mongoose.Types.ObjectId.isValid(id);

const cleanString = (value, maxLength = 5000) => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
};

const getPagination = (req) => {
  const page = Math.max(
    parseInt(req.query.page, 10) || 1,
    1
  );

  const limit = Math.min(
    Math.max(
      parseInt(req.query.limit, 10) || 20,
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

const allowedStatuses = [
  "new",
  "read",
  "replied",
];

// ==================================================
// PUBLIC - CREATE CONTACT MESSAGE
// ==================================================

const createContact = async (req, res) => {
  try {
    const body = req.body || {};

    const fullName = cleanString(
      body.fullName,
      100
    );

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    // Model maximum = 20
    const phone = cleanString(
      body.phone,
      20
    );

    const subject = cleanString(
      body.subject,
      200
    );

    const message = cleanString(
      body.message,
      5000
    );

    // ================= REQUIRED FIELDS =================

    if (
      !fullName ||
      !email ||
      !subject ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Full Name, Email, Subject and Message are required.",
      });
    }

    // ================= EMAIL =================

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide a valid email address.",
      });
    }

    if (email.length > 150) {
      return res.status(400).json({
        success: false,
        message:
          "Email address is too long.",
      });
    }

    // ================= LENGTH =================

    if (fullName.length < 2) {
      return res.status(400).json({
        success: false,
        message:
          "Full Name must be at least 2 characters.",
      });
    }

    if (subject.length < 3) {
      return res.status(400).json({
        success: false,
        message:
          "Subject must be at least 3 characters.",
      });
    }

    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        message:
          "Message must be at least 10 characters.",
      });
    }

    // ================= PHONE =================

    if (phone) {
      if (
        !/^[0-9+\-\s()]{7,20}$/.test(phone)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please provide a valid phone number.",
        });
      }
    }

    // ================= CREATE =================

    const contact = await Contact.create({
      fullName,
      email,
      phone,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message:
        "Message sent successfully.",
      data: {
        id: contact._id,
        fullName: contact.fullName,
        email: contact.email,
        subject: contact.subject,
        status: contact.status,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error(
      "❌ Create Contact Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to send your message.",
    });
  }
};

// ==================================================
// ADMIN - GET ALL CONTACT MESSAGES
// ==================================================

const getAllContacts = async (req, res) => {
  try {
    const {
      page,
      limit,
      skip,
    } = getPagination(req);

    const [contacts, total] =
      await Promise.all([
        Contact.find()
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit)
          .lean(),

        Contact.countDocuments(),
      ]);

    return res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        totalPages:
          Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(
      "❌ Get Contacts Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to fetch contact messages.",
    });
  }
};

// ==================================================
// ADMIN - GET SINGLE CONTACT
// ==================================================

const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID.",
      });
    }

    const contact =
      await Contact.findById(id).lean();

    if (!contact) {
      return res.status(404).json({
        success: false,
        message:
          "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error(
      "❌ Get Contact Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to fetch contact message.",
    });
  }
};

// ==================================================
// ADMIN - UPDATE CONTACT
// ==================================================

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID.",
      });
    }

    const body = req.body || {};
    const updateData = {};

    // ================= STATUS =================

    if (body.status !== undefined) {
      if (
        typeof body.status !== "string" ||
        !allowedStatuses.includes(
          body.status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid contact status.",
        });
      }

      updateData.status = body.status;
    }

    // ================= ADMIN NOTES =================

    if (body.adminNotes !== undefined) {
      if (
        typeof body.adminNotes !==
        "string"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Admin notes must be text.",
        });
      }

      // Model maximum = 2000
      updateData.adminNotes =
        cleanString(
          body.adminNotes,
          2000
        );
    }

    if (
      Object.keys(updateData).length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "No valid fields provided for update.",
      });
    }

    const updatedContact =
      await Contact.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      ).lean();

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message:
          "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Contact updated successfully.",
      data: updatedContact,
    });
  } catch (error) {
    console.error(
      "❌ Update Contact Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to update contact message.",
    });
  }
};

// ==================================================
// ADMIN - DELETE CONTACT
// ==================================================

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID.",
      });
    }

    const contact =
      await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message:
          "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Contact message deleted successfully.",
    });
  } catch (error) {
    console.error(
      "❌ Delete Contact Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to delete contact message.",
    });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};