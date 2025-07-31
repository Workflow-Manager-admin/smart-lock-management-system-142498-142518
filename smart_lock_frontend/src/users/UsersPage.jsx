import React, { useState, useEffect } from "react";
import { apiFetch } from "../shared/api";

// PUBLIC_INTERFACE
const UsersPage = () => {
  /** Lists all users, their roles, and basic management options. */
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(null);

  const fetchUsers = async () => {
    try {
      const data = await apiFetch("users/");
      setUsers(data);
    } catch (e) {
      setErr(e?.detail || "Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {err && <div style={{ color: "var(--color-error)" }}>{err}</div>}
      <div>
        {users.length === 0 && <p>No users found.</p>}
        <table style={{ width: "100%", fontSize: 16, marginTop: 6 }}>
          <thead>
            <tr style={{ color: "var(--color-text-light)" }}>
              <th align="left">Username</th>
              <th align="left">Email</th>
              <th align="left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role || 'User'}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="3" style={{ color: "var(--color-text-light)" }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
