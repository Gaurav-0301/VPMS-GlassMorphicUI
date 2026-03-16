import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // 1. Check if user is logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check if the user has the correct role for this page
  if (allowedRole && userRole !== allowedRole) {
    // If they are a Host trying to access Admin, send them back
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;