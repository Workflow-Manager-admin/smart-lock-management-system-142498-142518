import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../shared/api";
import { FaLock, FaUnlock } from "react-icons/fa";

// PUBLIC_INTERFACE
const LockDetailPage = () => {
  /** Shows one smart lock details: status, lock/unlock control, permissions, and recent events. */
  const { lockId } = useParams();
  const [lock, setLock] = useState(null);
  const [events, setEvents] = useState([]);
  const [accessList, setAccessList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [addingUser, setAddingUser] = useState(false);
  const [newUser, setNewUser] = useState('');

  const fetchAll = async () => {
    setLoading(true);
    try {
      const data = await apiFetch(`locks/${lockId}/`);
      setLock(data);
      setAccessList(data.access_users || []);
      const evs = await apiFetch(`locks/${lockId}/events/`);
      setEvents(evs);
    } catch (e) {
      setErr(e?.detail || "Failed to fetch lock details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [lockId]);

  const handleToggle = async () => {
    try {
      await apiFetch(`locks/${lockId}/${lock.is_locked ? "unlock" : "lock"}/`, { method: "POST" });
      fetchAll();
    } catch (e) {
      setErr(e?.detail || "Error toggling lock.");
    }
  };

  const handleAddAccess = async (e) => {
    e.preventDefault();
    try {
      await apiFetch(`locks/${lockId}/add_user/`, {
        method: "POST",
        body: JSON.stringify({ username: newUser }),
      });
      setNewUser('');
      fetchAll();
    } catch (e) {
      setErr(e?.detail || "Could not add user.");
    }
  };

  const handleRemoveAccess = async (userToRemove) => {
    try {
      await apiFetch(`locks/${lockId}/remove_user/`, {
        method: "POST",
        body: JSON.stringify({ username: userToRemove }),
      });
      fetchAll();
    } catch (e) {
      setErr(e?.detail || "Could not remove user.");
    }
  };

  if (loading) return <p>Loading lock...</p>;
  if (err) return <p style={{ color: "var(--color-error)" }}>{err}</p>;

  return (
    <div>
      <h2>Lock: {lock.name}</h2>
      <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 600, color: "var(--color-primary)", fontSize: 16 }}>
            Status:{" "}
            <span style={{ color: lock.is_locked ? "var(--color-error)" : "var(--color-secondary)" }}>
              {lock.is_locked ? <FaLock /> : <FaUnlock />}
              &nbsp; {lock.is_locked ? "Locked" : "Unlocked"}
            </span>
          </div>
          <div style={{ color: "var(--color-text-light)", fontSize: 13 }}>Location: {lock.location || "-"}</div>
        </div>
        <button className="button-accent" onClick={handleToggle}>
          {lock.is_locked ? "Unlock" : "Lock"}
        </button>
      </div>

      <div className="card" style={{ marginTop: 22 }}>
        <div style={{ fontWeight: "600", marginBottom: 6 }}>Access Permissions</div>
        <div style={{ marginBottom: 8 }}>
          {accessList.length === 0 && <span>No users have access.</span>}
          {accessList.map((username) => (
            <span
              key={username}
              style={{
                display: "inline-block",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
                marginRight: 8,
                marginTop: 3,
                padding: "5px 12px",
                fontSize: 15,
                color: "var(--color-text)",
              }}
            >
              {username}
              &nbsp;
              <button
                style={{
                  background: "none",
                  color: "var(--color-error)",
                  border: "none",
                  fontSize: 16,
                  marginLeft: 2,
                  cursor: "pointer"
                }}
                onClick={() => handleRemoveAccess(username)}
                title="Remove access"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <form onSubmit={handleAddAccess} style={{ marginTop: 10, display: "flex", gap: 8 }}>
          <input
            type="text"
            placeholder="Username to grant access"
            required
            value={newUser}
            onChange={e => setNewUser(e.target.value)}
            style={{ flex: 1 }}
            disabled={addingUser}
          />
          <button className="button" type="submit" disabled={addingUser}>
            Add
          </button>
        </form>
      </div>

      <div className="card" style={{ marginTop: 22 }}>
        <div style={{ fontWeight: "600", marginBottom: 8 }}>Recent Events</div>
        <table style={{ width: "100%", fontSize: 15, marginTop: 9 }}>
          <thead>
            <tr style={{ color: "var(--color-text-light)" }}>
              <th align="left">Time</th>
              <th align="left">User</th>
              <th align="left">Action</th>
              <th align="left">Result</th>
            </tr>
          </thead>
          <tbody>
            {events.map(ev => (
              <tr key={ev.id}>
                <td>{new Date(ev.timestamp).toLocaleString()}</td>
                <td>{ev.username}</td>
                <td>{ev.action}</td>
                <td>{ev.result}</td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan="4" style={{ color: "var(--color-text-light)" }}>
                  No activity found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LockDetailPage;
