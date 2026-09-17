const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const mongoose = require("mongoose");

const connectDB = require("./config/db");

// ================= ROUTES =================

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const contactRoutes = require("./routes/contactRoutes");
const blogRoutes = require("./routes/blogRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const technologyRoutes = require("./routes/technologyRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const savedJobRoutes = require("./routes/savedJobRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// ================= ERROR HANDLING =================

const {
  errorHandler,
  notFound,
} = require("./middleware/errorMiddleware");

// ================= ENVIRONMENT =================

dotenv.config();

// ================= ENV VALIDATION =================

const requiredEnv = ["MONGO_URI", "JWT_SECRET"];

for (const envName of requiredEnv) {
  if (!process.env[envName]) {
    console.error(`❌ Missing environment variable: ${envName}`);
    process.exit(1);
  }
}

// ================= APP =================

const app = express();

// ================= TRUST PROXY =================

// Required when deployed behind a reverse proxy.
// If your hosting provider does not use a proxy,
// this can later be adjusted.
app.set("trust proxy", 1);

// ================= SECURITY =================

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

// ================= CORS =================

// Example:
// CLIENT_URL=http://localhost:5173
//
// Multiple origins:
// CLIENT_URL=http://localhost:5173,https://example.com

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests that do not contain an Origin header.
      // Example: Postman, curl, server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      // CLIENT_URL must be configured for browser requests.
      if (allowedOrigins.length === 0) {
        const error = new Error("CORS origin is not configured");
        error.statusCode = 403;
        error.isOperational = true;

        return callback(error);
      }

      // Allow configured frontend origins only.
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      const error = new Error("Not allowed by CORS");
      error.statusCode = 403;
      error.isOperational = true;

      return callback(error);
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// ================= BODY PARSER =================

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

// ================= RATE LIMIT =================

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

// Apply general rate limiting to API routes.
app.use("/api", apiLimiter);

// ================= AUTH RATE LIMIT =================

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many authentication attempts. Please try again later.",
  },
});

// ================= STATIC UPLOADS =================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    maxAge: "1d",
  })
);

// ================= API ROUTES =================

// Authentication
app.use(
  "/api/auth",
  authLimiter,
  authRoutes
);

// Users
app.use(
  "/api/users",
  userRoutes
);

// Admin
app.use(
  "/api/admin",
  adminRoutes
);

// Jobs
app.use(
  "/api/jobs",
  jobRoutes
);

// Applications
app.use(
  "/api/applications",
  applicationRoutes
);

// Saved Jobs
app.use(
  "/api/saved-jobs",
  savedJobRoutes
);

// Dashboards
app.use(
  "/api/dashboard",
  dashboardRoutes
);

// Internships
app.use(
  "/api/internships",
  internshipRoutes
);

// Contacts
app.use(
  "/api/contacts",
  contactRoutes
);

// Blogs
app.use(
  "/api/blogs",
  blogRoutes
);

// Services
app.use(
  "/api/services",
  serviceRoutes
);

// Testimonials
app.use(
  "/api/testimonials",
  testimonialRoutes
);

// Portfolio
app.use(
  "/api/portfolio",
  portfolioRoutes
);

// Technologies
app.use(
  "/api/technologies",
  technologyRoutes
);

// Partners
app.use(
  "/api/partners",
  partnerRoutes
);

// ================= HEALTH CHECK =================

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Steps Infotech Backend Running...",
  });
});

app.get("/api/health", (req, res) => {
  const dbStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  const dbState =
    dbStates[mongoose.connection.readyState] || "unknown";

  const healthy = dbState === "connected";

  return res.status(healthy ? 200 : 503).json({
    success: healthy,
    message: healthy
      ? "API is healthy"
      : "Database connection is unavailable",
    database: dbState,
  });
});

// ================= 404 =================

app.use(notFound);

// ================= GLOBAL ERROR HANDLER =================

app.use(errorHandler);

// ================= SERVER =================

const PORT = Number(process.env.PORT) || 5000;

let server;

// ================= START SERVER =================

const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log("----------------------------------------");
      console.log("🚀 Steps Infotech Backend");
      console.log("----------------------------------------");
      console.log(`Server running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
      console.log("----------------------------------------");
    });
  } catch (error) {
    console.error(
      "❌ Server startup failed:",
      error.message
    );

    process.exit(1);
  }
};

// ================= GRACEFUL SHUTDOWN =================

const shutdown = async (signal) => {
  console.log(
    `${signal} received. Shutting down server...`
  );

  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) {
            return reject(error);
          }

          resolve();
        });
      });

      console.log("HTTP server closed.");
    }

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log("MongoDB connection closed.");
    }

    process.exit(0);
  } catch (error) {
    console.error(
      "❌ Error during shutdown:",
      error.message
    );

    process.exit(1);
  }
};

process.on("SIGTERM", () => {
  shutdown("SIGTERM");
});

process.on("SIGINT", () => {
  shutdown("SIGINT");
});

// ================= START APPLICATION =================

startServer();