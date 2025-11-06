import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authUser = JSON.parse(localStorage.getItem('authUser'));
  const location = useLocation();

  // If not logged in, redirect to login and remember the page they tried to access
  if (!authUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Otherwise, render the protected page
  return children;
};

export default ProtectedRoute;
