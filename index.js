// ─────────────────────────────────────────────────────────────────────────────
// index.js — Main Entry Point
// Author : Rohan Deuja
// Student Number : C0957767
//
// Sets up Express server, connects to MongoDB, and registers API routes.
// ─────────────────────────────────────────────────────────────────────────────
const path = require("path");
const User = require("./Model/User"); // For page routes to fetch users

require("dotenv").config(); // load .env variables first

const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();
// ── Template Engine Setup ─────────────────────────────────────────────────────
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse HTML form POST bodies

// ── Static Files (for CSS/JS) ─────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, "public")));

// ── PAGE ROUTES (Frontend - HTML Pages) ───────────────────────────────────────

// Page 1: Add User Form
app.get("/add-user", (req, res) => {
  res.render("add-user", {
    title: "Add New User",
    page: "add",
  });
});

// Page 2: Display All Users in Table
app.get("/users-list", async (req, res) => {
  try {
    const users = await User.find().sort({ lastName: 1 });
    res.render("users-list", {
      title: "User List",
      users: users,
      page: "list",
    });
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

// Page 3: Edit/Delete User Form
app.get("/edit-user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Format date for input field (YYYY-MM-DD)
    const formattedDate = user.dateOfBirth.toISOString().split("T")[0];

    res.render("edit-user", {
      title: "Edit User",
      user: user,
      formattedDate: formattedDate,
      page: "edit",
    });
  } catch (err) {
    res.status(500).send("Error fetching user");
  }
});

// ── API Routes ────────────────────────────────────────────────────────────────
const userRoutes = require("./Routes/users");
app.use("/users", userRoutes);

// ── Root route — redirect to users list page ─────────────────────────────────
app.get("/", (req, res) => {
  res.redirect("/users-list");
});

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  // Check if request is for API
  if (
    req.originalUrl.startsWith("/users") &&
    !req.originalUrl.startsWith("/users-list")
  ) {
    return res.status(404).json({
      success: false,
      message: `API route ${req.originalUrl} not found`,
    });
  }
  // For page requests, render 404 page
  res.status(404).render("error", {
    title: "404 - Page Not Found",
    message: `Page ${req.originalUrl} not found`,
  });
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);

  // Check if request is for API
  if (
    req.originalUrl.startsWith("/users") &&
    !req.originalUrl.startsWith("/users-list")
  ) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }

  // For page requests, render error page
  res.status(500).render("error", {
    title: "500 - Server Error",
    message: "Internal Server Error",
  });
});

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
