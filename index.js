// ─────────────────────────────────────────────────────────────────────────────
// index.js — Main Entry Point
// Author : Rohan Deuja
// Student Number : C0957767
//
// Sets up Express server, connects to MongoDB, and registers API routes.
// ─────────────────────────────────────────────────────────────────────────────

require("dotenv").config(); // load .env variables first

const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse HTML form POST bodies

// ── API Routes ────────────────────────────────────────────────────────────────
const userRoutes = require("./Routes/users");
app.use("/users", userRoutes);

// ── Root route — quick health check ──────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "User CRUD API is running",
    endpoints: {
      getAllUsers: "GET    /api/users",
      getSingleUser: "GET    /api/users/:id",
      createUser: "POST   /api/users",
      updateUser: "PUT    /api/users/:id",
      deleteUser: "DELETE /api/users/:id",
    },
  });
});

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
