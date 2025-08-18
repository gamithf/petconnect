import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { apiRequest, authApi } from "../api/api";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await authApi.get('/auth/verify');
        let authenticated = response.data.status === 'success';
        console.log("Authenticated:", authenticated);
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

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;