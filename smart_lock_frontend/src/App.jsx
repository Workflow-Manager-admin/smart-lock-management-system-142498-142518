import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import DashboardLayout from './dashboard/DashboardLayout';
import LocksListPage from './locks/LocksListPage';
import LockDetailPage from './locks/LockDetailPage';
import UsersPage from './users/UsersPage';
import EventsPage from './events/EventsPage';
import NotFound from './shared/NotFound';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

// PUBLIC_INTERFACE
function App() {
  /** Main entry point of the Smart Lock Frontend app. Handles routing, auth, and page layouts. */
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Dashboard area */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<LocksListPage />} />
            <Route path="locks/:lockId" element={<LockDetailPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="events" element={<EventsPage />} />
          </Route>

          {/* Not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
