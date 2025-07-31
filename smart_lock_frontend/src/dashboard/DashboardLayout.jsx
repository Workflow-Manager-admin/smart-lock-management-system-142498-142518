import React from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { FaLock, FaUsers, FaListAlt, FaSignOutAlt } from "react-icons/fa";

const navItems = [
  { path: "/", label: "Smart Locks", icon: <FaLock size={20} /> },
  { path: "/users", label: "Users", icon: <FaUsers size={20} /> },
  { path: "/events", label: "Events", icon: <FaListAlt size={20} /> },
];

const Sidebar = () => (
  <nav className="sidebar">
    <div style={{ fontSize: 23, fontWeight: 700, color: "var(--color-primary)", marginLeft: '0.6em', marginBottom: "2.5em" }}>
      <FaLock /> &nbsp; Lock Admin
    </div>
    {navItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        end={item.path === "/"}
        style={({ isActive }) => ({
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "0.7em",
          fontWeight: 600,
          color: isActive ? "var(--color-primary)" : "var(--color-text-light)",
          background: isActive ? "var(--color-accent)" : "",
          borderRadius: "var(--radius)",
          padding: "0.6em 1em",
          marginBottom: "0.7em",
        })}
      >
        {item.icon}
        <span className="sidebar-label" style={{ fontSize: 16 }}>
          {item.label}
        </span>
      </NavLink>
    ))}
  </nav>
);

const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="topbar">
      <span style={{ marginRight: 14, color: "var(--color-text-light)" }}>
        {user?.username}
      </span>
      <button style={{ background: "none", border: "none", color: "var(--color-error)" }} onClick={onLogout}>
        <FaSignOutAlt size={22} /> Logout
      </button>
    </header>
  );
};

// PUBLIC_INTERFACE
const DashboardLayout = () => (
  <div className="app-layout">
    <Sidebar />
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Topbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  </div>
);

export default DashboardLayout;
