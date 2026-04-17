// ─────────────────────────────────────────────────────────────────────────────
// src/pages/AddUser.js
// Author: Rohan Deuja | C0957767
//
// Form to add a new user. Calls POST /users/create via api.js
// Uses Evergreen UI inputs and React Bootstrap grid for layout.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInputField, Textarea, Button, Alert, toaster } from "evergreen-ui";
import { Row, Col } from "react-bootstrap";
import { createUser } from "../services/api";

function AddUser() {
  const navigate = useNavigate();

  // ── All form fields in one state object ──────────────────────────────────────
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    email: "",
    userNotes: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ── Update only the changed field ────────────────────────────────────────────
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ── Submit — POST to backend ──────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createUser(form);
      toaster.success("User added successfully!");
      navigate("/users");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create user";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="form-card">
        <h2 className="form-title">➕ Add New User</h2>

        {error && <Alert intent="danger" title={error} marginBottom={16} />}

        <form onSubmit={handleSubmit}>
          {/* First Name + Last Name */}
          <Row>
            <Col md={6}>
              <TextInputField
                label="First Name *"
                name="firstName"
                placeholder="John"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={6}>
              <TextInputField
                label="Last Name *"
                name="lastName"
                placeholder="Doe"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          {/* Date of Birth + Phone */}
          <Row>
            <Col md={6}>
              <TextInputField
                label="Date of Birth *"
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={6}>
              <TextInputField
                label="Phone Number *"
                name="phoneNumber"
                placeholder="555-123-4567"
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          {/* Email */}
          <TextInputField
            label="Email *"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Address */}
          <TextInputField
            label="Address Line 1 *"
            name="address1"
            placeholder="123 Main St"
            value={form.address1}
            onChange={handleChange}
            required
          />
          <TextInputField
            label="Address Line 2 (optional)"
            name="address2"
            placeholder="Apt 4B"
            value={form.address2}
            onChange={handleChange}
          />

          {/* City + Postal + Country */}
          <Row>
            <Col md={4}>
              <TextInputField
                label="City *"
                name="city"
                placeholder="Toronto"
                value={form.city}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={4}>
              <TextInputField
                label="Postal Code *"
                name="postalCode"
                placeholder="M5V 2T6"
                value={form.postalCode}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={4}>
              <TextInputField
                label="Country *"
                name="country"
                placeholder="Canada"
                value={form.country}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          {/* Notes */}
          <label className="ev-label">User Notes (optional)</label>
          <Textarea
            name="userNotes"
            placeholder="Any additional notes..."
            value={form.userNotes}
            onChange={handleChange}
            rows={3}
            marginBottom={16}
          />

          {/* Buttons */}
          <div className="form-buttons">
            <Button
              appearance="primary"
              intent="success"
              height={40}
              isLoading={loading}
              type="submit"
            >
              ✅ Save User
            </Button>
            <Button
              appearance="minimal"
              height={40}
              onClick={() => navigate("/users")}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
