import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  if (user) return <Navigate to="/" />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(form.username, form.password);
      navigate("/");
    } catch (err) {
      setError(err.detail || "Login failed. Check credentials.");
    }
  };

  return (
    <div className="main-content" style={{ maxWidth: 380, margin: "5vh auto" }}>
      <h2>Sign in</h2>
      <form className="card" onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input name="username" type="text" required autoFocus value={form.username} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input name="password" type="password" required value={form.password} onChange={handleChange} />
          </label>
        </div>
        {error && <div style={{ color: "var(--color-error)", margin: "0.6em 0" }}>{error}</div>}
        <button type="submit" className="button" style={{ width: "100%" }}>
          Login
        </button>
      </form>
      <div style={{ textAlign: "center", marginTop: "2rem", color: "var(--color-text-light)" }}>
        New here? <Link to="/register">Create account</Link>
      </div>
    </div>
  );
};

export default LoginPage;
