import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const isLoggedIn = localStorage.getItem("userId");

  if (!isLoggedIn) {
    return <Navigate to="/login"  />;
  }

  return children; 
};

export default ProtectedRoutes;
