import React, { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../shared/api";

// PUBLIC_INTERFACE
const AuthContext = createContext();

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides authentication context and logic to all descendants. */

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Try restore session from localStorage
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("authUser");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (username, password) => {
    // Customize for backend API shape
    const { token, user: userData } = await apiFetch("auth/login/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const register = async (registrationData) => {
    // registrationData = {username, password, ...}
    const { user: userData, token } = await apiFetch("auth/register/", {
      method: "POST",
      body: JSON.stringify(registrationData),
    });
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Access authentication context with user and auth ops. */
  return useContext(AuthContext);
}
