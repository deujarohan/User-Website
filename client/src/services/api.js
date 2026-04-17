// ─────────────────────────────────────────────────────────────────────────────
// services/api.js
// Author: Rohan Deuja | C0957767
//
// Centralizes all Axios HTTP calls to the Express backend.
// Instead of writing axios.get(...) in every component, we import
// these functions so the API base URL is defined in ONE place.
// ─────────────────────────────────────────────────────────────────────────────

import axios from "axios";

// Base URL of our Express backend
const BASE_URL = "http://localhost:3000/users";

// ── GET all users ─────────────────────────────────────────────────────────────
export const getAllUsers = () => axios.get(`${BASE_URL}/getall`);

// ── GET one user by ID ────────────────────────────────────────────────────────
export const getUserById = (id) => axios.get(`${BASE_URL}/${id}`);

// ── POST create new user ──────────────────────────────────────────────────────
export const createUser = (userData) =>
  axios.post(`${BASE_URL}/create`, userData);

// ── PUT update existing user ──────────────────────────────────────────────────
export const updateUser = (id, userData) =>
  axios.put(`${BASE_URL}/update/${id}`, userData);

// ── DELETE a user ─────────────────────────────────────────────────────────────
export const deleteUser = (id) => axios.delete(`${BASE_URL}/delete/${id}`);
