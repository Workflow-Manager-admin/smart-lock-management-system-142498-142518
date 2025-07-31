import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RegisterPage = () => {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "", email: "" });
  const [error, setError] = useState(null);

  if (user) return <Navigate to="/" />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err.detail || "Registration failed. Check input.");
    }
  };

  return (
    <div className="main-content" style={{ maxWidth: 400, margin: "5vh auto" }}>
      <h2>Create Account</h2>
      <form className="card" onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input name="username" type="text" required value={form.username} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Email
            <input name="email" type="email" required value={form.email} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input name="password" type="password" required value={form.password} onChange={handleChange} minLength={6} />
          </label>
        </div>
        {error && <div style={{ color: "var(--color-error)", margin: "0.6em 0" }}>{error}</div>}
        <button type="submit" className="button" style={{ width: "100%" }}>
          Register
        </button>
      </form>
      <div style={{ textAlign: "center", marginTop: "2rem", color: "var(--color-text-light)" }}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
