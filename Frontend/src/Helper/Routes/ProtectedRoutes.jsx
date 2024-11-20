import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const path = location.pathname;

  if (!token) {
    if (path === "/") {
      return <Navigate to="/sign-in" replace />;
    }
  } else if (token) {
    if (path === "/sign-in" || path === "/sign-up") {
      return <Navigate to="/" replace />;
    } else if (path === "/") {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}
