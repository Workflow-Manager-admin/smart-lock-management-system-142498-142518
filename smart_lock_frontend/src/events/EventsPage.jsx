import React, { useState, useEffect } from "react";
import { apiFetch } from "../shared/api";

// PUBLIC_INTERFACE
const EventsPage = () => {
  /** Lists access/lock events system-wide (with timestamp, user, action, result). */
  const [events, setEvents] = useState([]);
  const [err, setErr] = useState(null);

  const fetchEvents = async () => {
    try {
      const data = await apiFetch("events/");
      setEvents(data);
    } catch (e) {
      setErr(e?.detail || "Failed to fetch events.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Access Events / Activity Logs</h2>
      {err && <div style={{ color: "var(--color-error)" }}>{err}</div>}
      <div className="card">
        <table style={{ width: "100%", fontSize: 15 }}>
          <thead>
            <tr style={{ color: "var(--color-text-light)" }}>
              <th align="left">Time</th>
              <th align="left">User</th>
              <th align="left">Lock</th>
              <th align="left">Action</th>
              <th align="left">Result</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 && (
              <tr>
                <td colSpan="5" style={{ color: "var(--color-text-light)" }}>No recent events found.</td>
              </tr>
            )}
            {events.map(ev => (
              <tr key={ev.id}>
                <td>{new Date(ev.timestamp).toLocaleString()}</td>
                <td>{ev.username}</td>
                <td>{ev.lock_name || ev.lock_id}</td>
                <td>{ev.action}</td>
                <td>{ev.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsPage;
