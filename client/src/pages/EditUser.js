// ─────────────────────────────────────────────────────────────────────────────
// src/pages/EditUser.js
// Author: Rohan Deuja | C0957767
//
// Edit page — loads user by ID, lets you update or delete.
// GET /users/:id to load data
// PUT /users/update/:id to save changes
// DELETE /users/delete/:id to remove user
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextInputField,
  Textarea,
  Button,
  Alert,
  toaster,
  Dialog,
} from "evergreen-ui";
import { Row, Col } from "react-bootstrap";
import { getUserById, updateUser, deleteUser } from "../services/api";

function EditUser() {
  const { id } = useParams(); // grab user ID from URL
  const navigate = useNavigate();

  // ── Form state ───────────────────────────────────────────────────────────────
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // ── Load user data when page opens ──────────────────────────────────────────
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        const user = res.data.data;

        // Format date to YYYY-MM-DD for the date input
        const dob = user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "";

        setForm({ ...user, dateOfBirth: dob });
      } catch (err) {
        setError("Could not load user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // ── Handle input changes ─────────────────────────────────────────────────────
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ── Save updated user ────────────────────────────────────────────────────────
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await updateUser(id, form);
      toaster.success("User updated successfully!");
      navigate("/users");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update user";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  // ── Delete user ──────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    try {
      await deleteUser(id);
      toaster.danger("User deleted.");
      navigate("/users");
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  if (loading)
    return (
      <div className="loading-screen">
        <p>Loading user...</p>
      </div>
    );

  return (
    <div className="page-wrapper">
      <div className="form-card">
        {/* Header with delete button */}
        <div className="edit-header">
          <h2>✏️ Edit User</h2>
          <Button
            appearance="primary"
            intent="danger"
            onClick={() => setShowDeleteDialog(true)}
          >
            🗑️ Delete User
          </Button>
        </div>

        {error && <Alert intent="danger" title={error} marginBottom={16} />}

        <form onSubmit={handleUpdate}>
          <Row>
            <Col md={6}>
              <TextInputField
                label="First Name *"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={6}>
              <TextInputField
                label="Last Name *"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

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
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <TextInputField
            label="Email *"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <TextInputField
            label="Address Line 1 *"
            name="address1"
            value={form.address1}
            onChange={handleChange}
            required
          />

          <TextInputField
            label="Address Line 2 (optional)"
            name="address2"
            value={form.address2}
            onChange={handleChange}
          />

          <Row>
            <Col md={4}>
              <TextInputField
                label="City *"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={4}>
              <TextInputField
                label="Postal Code *"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={4}>
              <TextInputField
                label="Country *"
                name="country"
                value={form.country}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <label className="ev-label">User Notes (optional)</label>
          <Textarea
            name="userNotes"
            value={form.userNotes}
            onChange={handleChange}
            rows={3}
            marginBottom={16}
          />

          <div className="form-buttons">
            <Button
              appearance="primary"
              intent="success"
              height={40}
              isLoading={saving}
              type="submit"
            >
              💾 Save Changes
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

      {/* Delete confirmation popup */}
      <Dialog
        isShown={showDeleteDialog}
        title="Delete User"
        intent="danger"
        onCloseComplete={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        confirmLabel="Yes, Delete"
      >
        Are you sure you want to delete this user? This cannot be undone.
      </Dialog>
    </div>
  );
}

export default EditUser;
