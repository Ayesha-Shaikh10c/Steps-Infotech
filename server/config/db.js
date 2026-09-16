const mongoose = require("mongoose");

// ==================================================
// MONGODB CONNECTION
// ==================================================

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not configured");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB Connected Successfully");
    console.log(`Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);

    // Do not allow the application to run without a database.
    process.exit(1);
  }
};

module.exports = connectDB;