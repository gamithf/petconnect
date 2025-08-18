import React, { useEffect, useState } from "react";
import { Navigate, useLocation  } from "react-router-dom";
import { apiRequest, authApi } from "../api/api";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await authApi.get('/auth/verify');
        let authenticated = response.data.status === 'success' ? true : false;
        if (authenticated) {
          sessionStorage.setItem("userId", response.data.data);
        }
        const authToken = sessionStorage.getItem("authToken");
        if (!authToken || authenticated) {
          setIsAuthenticated(true);
          return;
        }
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>authenticating...</div>;
  }

  let isAuthenticatedCheck = !!sessionStorage.getItem('userId');
  if (!isAuthenticatedCheck) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;