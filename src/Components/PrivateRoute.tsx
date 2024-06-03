import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token'); // Adjust according to how you store your JWT
  let isAuthenticated = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      isAuthenticated = decodedToken.exp > currentTime;
    } catch (error) {
      console.error('Failed to decode token:', error);
      isAuthenticated = false;
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
