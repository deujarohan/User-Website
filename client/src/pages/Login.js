// ─────────────────────────────────────────────────────────────────────────────
// src/pages/Login.js
// Author: Rohan Deuja | C0957767
//
// Login page. Uses hardcoded credentials (admin / admin123) for demo.
// In a real app you'd validate against a database with hashed passwords.
// Uses Evergreen UI components for a clean form look.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from "react";
import { TextInputField, Button, Alert } from "evergreen-ui";

function Login({ onLogin }) {
  // Track what user types in the form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Hardcoded demo credentials
  const DEMO_USER = "admin";
  const DEMO_PASS = "admin123";

  const handleLogin = (e) => {
    e.preventDefault(); // stop page from refreshing
    setLoading(true);
    setError("");

    // Simulate API delay
    setTimeout(() => {
      if (username === DEMO_USER && password === DEMO_PASS) {
        onLogin(); // tell App.js login was successful
      } else {
        setError("Invalid credentials. Use admin / admin123");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h1>👤</h1>
          <h2>UserManager</h2>
          <p>Sign in to continue</p>
        </div>

        {/* Show error if login fails */}
        {error && <Alert intent="danger" title={error} marginBottom={16} />}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <TextInputField
            label="Username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextInputField
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            appearance="primary"
            width="100%"
            height={40}
            isLoading={loading}
            type="submit"
          >
            Sign In
          </Button>
        </form>

        <p className="login-hint">Demo: admin / admin123</p>
      </div>
    </div>
  );
}

export default Login;
