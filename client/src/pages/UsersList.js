// ─────────────────────────────────────────────────────────────────────────────
// src/pages/UsersList.js
// Author: Rohan Deuja | C0957767
//
// Displays all users in an AG Grid table with sorting, filtering, pagination.
// Fetches data from Express backend using getAllUsers() from api.js
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { getAllUsers } from "../services/api";

// Required AG Grid styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function UsersList() {
  const [users, setUsers] = useState([]); // holds all user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ── Fetch all users from backend ─────────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res.data.data); // API returns { success, count, data: [...] }
    } catch (err) {
      setError("Failed to load users. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch users when component first loads
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ── Edit button rendered inside each row ─────────────────────────────────────
  const ActionButtons = ({ data }) => (
    <div className="grid-actions">
      <button
        className="btn btn-sm btn-warning"
        onClick={() => navigate(`/edit-user/${data._id}`)}
      >
        ✏️ Edit
      </button>
    </div>
  );

  // ── AG Grid column definitions ────────────────────────────────────────────────
  const columnDefs = [
    {
      field: "firstName",
      headerName: "First Name",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      filter: true,
      flex: 1.5,
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Actions",
      cellRenderer: ActionButtons,
      width: 120,
      sortable: false,
      filter: false,
    },
  ];

  // ── Default settings for all columns ─────────────────────────────────────────
  const defaultColDef = {
    resizable: true,
    minWidth: 100,
  };

  // ── Loading state ─────────────────────────────────────────────────────────────
  if (loading)
    return (
      <div className="loading-screen">
        <Spinner animation="border" variant="primary" />
        <p>Loading users...</p>
      </div>
    );

  // ── Error state ───────────────────────────────────────────────────────────────
  if (error)
    return (
      <div className="error-screen">
        <p>❌ {error}</p>
        <Button onClick={fetchUsers}>Retry</Button>
      </div>
    );

  return (
    <div className="page-wrapper">
      {/* Header row with title and add button */}
      <div className="page-header">
        <h2>
          👥 All Users <span className="badge bg-primary">{users.length}</span>
        </h2>
        <Button variant="success" onClick={() => navigate("/add-user")}>
          ➕ Add New User
        </Button>
      </div>

      {/* AG Grid Table */}
      <div className="ag-theme-alpine grid-container">
        <AgGridReact
          rowData={users}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          animateRows={true}
          rowHeight={48}
        />
      </div>
    </div>
  );
}

export default UsersList;
