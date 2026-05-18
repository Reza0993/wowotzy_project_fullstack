const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/authRoutes.js");

app.use("/api", apiRoutes);
app.use("/api/auth", authRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Poptube API"
  });
});

const path = require("path");

// ✅ Daftarkan static folder uploads sebelum handler 404 dan handler error
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found"
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

module.exports = app;