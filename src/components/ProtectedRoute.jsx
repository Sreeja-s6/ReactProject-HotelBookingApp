import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authUser = JSON.parse(localStorage.getItem('authUser'));

  // If no user is logged in, redirect to login
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected page
  return children;
};

export default ProtectedRoute;
