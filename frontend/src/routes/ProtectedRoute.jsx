import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { apiRequest } from "../api/api";
const VITE_NODE_BASE_URL = import.meta.env.VITE_NODE_BASE_URL;

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await apiRequest(`${VITE_NODE_BASE_URL}/auth/verify`, 'GET');
        let authenticated = response.data.status === 'success';
        setIsAuthenticated(authenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>authenticating...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;