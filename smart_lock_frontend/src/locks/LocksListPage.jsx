import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../shared/api";
import { FaLock, FaUnlock } from "react-icons/fa";

// PUBLIC_INTERFACE
const LocksListPage = () => {
  /** Shows the list of all smart locks, with quick status and lock/unlock controls. */

  const [locks, setLocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const fetchLocks = async () => {
    setLoading(true);
    try {
      const data = await apiFetch("locks/");
      setLocks(data);
    } catch (e) {
      setErr(e?.detail || "Failed to fetch locks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocks();
    // Optionally: Setup interval for near-realtime updates
    const interval = setInterval(fetchLocks, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = async (lockId, locked) => {
    try {
      await apiFetch(`locks/${lockId}/${locked ? "unlock" : "lock"}/`, { method: "POST" });
      fetchLocks();
    } catch (e) {
      setErr(e?.detail || "Error toggling lock.");
    }
  };

  if (loading) return <p>Loading locks...</p>;
  if (err) return <p style={{ color: "var(--color-error)" }}>{err}</p>;

  return (
    <div>
      <h2>Smart Locks</h2>
      <div>
        {locks.length === 0 && <p>No locks found.</p>}
        {locks.map((lock) => (
          <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} key={lock.id}>
            <div style={{ flex: 1, cursor: "pointer" }} onClick={() => navigate(`/locks/${lock.id}`)}>
              <b style={{ color: "var(--color-primary)", fontSize: 18 }}>{lock.name}</b>
              <div style={{ fontSize: 13, color: "var(--color-text-light)" }}>
                {lock.location || ""}
              </div>
            </div>
            <div style={{ marginRight: 10, color: lock.is_locked ? "var(--color-error)" : "var(--color-secondary)", fontWeight: 600 }}>
              {lock.is_locked ? <FaLock /> : <FaUnlock />} &nbsp; {lock.is_locked ? "Locked" : "Unlocked"}
            </div>
            <button className="button-secondary" style={{ marginLeft: 20 }} onClick={() => handleToggle(lock.id, lock.is_locked)}>
              {lock.is_locked ? "Unlock" : "Lock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocksListPage;
