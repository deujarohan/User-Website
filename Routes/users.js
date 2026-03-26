// routes/users.js
// All CRUD routes for the User resource.
//
// GET    /api/users        → get all users
// GET    /api/users/:id    → get one user
// POST   /api/users        → create a user
// PUT    /api/users/:id    → update a user
// DELETE /api/users/:id    → delete a user

const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../Model/User");

// ── Validation rules (reused for POST and PUT) ────────────────────────────────
const userValidationRules = [
  body("firstName").notEmpty().withMessage("First name is required").trim(),
  body("lastName").notEmpty().withMessage("Last name is required").trim(),
  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Date must be in YYYY-MM-DD format"),
  body("address1").notEmpty().withMessage("Address1 is required").trim(),
  body("city").notEmpty().withMessage("City is required").trim(),
  body("postalCode").notEmpty().withMessage("Postal code is required").trim(),
  body("country").notEmpty().withMessage("Country is required").trim(),
  body("phoneNumber").notEmpty().withMessage("Phone number is required").trim(),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
];

// ── Helper: return validation errors if any ───────────────────────────────────
function checkValidation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  return null;
}

// ── GET /api/users — fetch all users ─────────────────────────────────────────
router.get("/getall", async (req, res) => {
  try {
    const users = await User.find().sort({ lastName: 1 });
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
});

// ── GET /api/users/:id — fetch one user ───────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    if (err.kind === "ObjectId")
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    res.status(500).json({ success: false, message: "Error fetching user" });
  }
});

// ── POST /api/users — create a new user ──────────────────────────────────────
router.post("/create", userValidationRules, async (req, res) => {
  if (checkValidation(req, res)) return;

  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      address1,
      address2,
      city,
      postalCode,
      country,
      phoneNumber,
      email,
      userNotes,
    } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      dateOfBirth,
      address1,
      address2: address2 || "",
      city,
      postalCode,
      country,
      phoneNumber,
      email,
      userNotes: userNotes || "",
    });

    res
      .status(201)
      .json({ success: true, message: "User created", data: newUser });
  } catch (err) {
    if (err.code === 11000)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    res.status(500).json({ success: false, message: "Error creating user" });
  }
});

// ── PUT /api/users/:id — update an existing user ──────────────────────────────
router.put("/update/:id", userValidationRules, async (req, res) => {
  if (checkValidation(req, res)) return;

  try {
    const updateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      address1: req.body.address1,
      address2: req.body.address2 || "",
      city: req.body.city,
      postalCode: req.body.postalCode,
      country: req.body.country,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      userNotes: req.body.userNotes || "",
    };

    // { new: true } returns the updated doc; runValidators applies schema rules
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res
      .status(200)
      .json({ success: true, message: "User updated", data: updatedUser });
  } catch (err) {
    if (err.code === 11000)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    if (err.kind === "ObjectId")
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    res.status(500).json({ success: false, message: "Error updating user" });
  }
});

// ── DELETE /api/users/:id — delete a user ────────────────────────────────────
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (err) {
    if (err.kind === "ObjectId")
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    res.status(500).json({ success: false, message: "Error deleting user" });
  }
});

module.exports = router;
