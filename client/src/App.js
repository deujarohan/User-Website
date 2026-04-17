// ─────────────────────────────────────────────────────────────────────────────
// App.js
// Author: Rohan Deuja | C0957767
//
// Root component. Sets up React Router so each URL shows the right page.
// Manages login state — if not logged in, redirects to /login.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Pages
import Login from "./pages/Login";
import UsersList from "./pages/UsersList";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";

// Components
import Navbar from "./components/Navbar";

function App() {
  // Simple login state — true means logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {/* Show navbar only when logged in */}
      {isLoggedIn && <Navbar onLogout={() => setIsLoggedIn(false)} />}

      <Routes>
        {/* Login page */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/users" />
            ) : (
              <Login onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />

        {/* Protected pages */}
        <Route
          path="/users"
          element={isLoggedIn ? <UsersList /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-user"
          element={isLoggedIn ? <AddUser /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-user/:id"
          element={isLoggedIn ? <EditUser /> : <Navigate to="/login" />}
        />

        {/* Default → redirect based on login state */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/users" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
