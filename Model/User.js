// models/User.js
// Mongoose schema defining all fields for a User document in MongoDB.

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Name fields
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },

    // Personal info
    dateOfBirth: { type: Date, required: [true, "Date of birth is required"] },

    // Address fields
    address1: {
      type: String,
      required: [true, "Address1 is required"],
      trim: true,
    },
    address2: { type: String, trim: true, default: "" }, // optional
    city: { type: String, required: [true, "City is required"], trim: true },
    postalCode: {
      type: String,
      required: [true, "Postal code is required"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },

    // Contact fields
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true, // always store email in lowercase
      unique: true, // no duplicate emails allowed
    },

    // Notes — optional
    userNotes: { type: String, trim: true, default: "" },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("User", userSchema);
