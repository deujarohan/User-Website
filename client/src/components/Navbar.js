// ─────────────────────────────────────────────────────────────────────────────
// src/components/Navbar.js
// Author: Rohan Deuja | C0957767
//
// Top navigation bar shown on all pages after login.
// Uses React Bootstrap Navbar for responsive mobile-friendly layout.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function AppNavbar({ onLogout }) {
  // useLocation tells us which page we're on
  // so we can highlight the active nav link
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="app-navbar">
      <Container>
        {/* Brand / Logo */}
        <Navbar.Brand as={Link} to="/users">
          👤 UserManager
        </Navbar.Brand>

        {/* Hamburger button for mobile screens */}
        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            {/* View Users link */}
            <Nav.Link
              as={Link}
              to="/users"
              className={location.pathname === "/users" ? "active-link" : ""}
            >
              📋 View Users
            </Nav.Link>

            {/* Add User link */}
            <Nav.Link
              as={Link}
              to="/add-user"
              className={location.pathname === "/add-user" ? "active-link" : ""}
            >
              ➕ Add User
            </Nav.Link>
          </Nav>

          {/* Logout button on the right side */}
          <Button variant="outline-danger" size="sm" onClick={onLogout}>
            🚪 Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
