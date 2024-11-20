import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const location = useLocation();
  const routeName = location.path;
  const token = localStorage.getItem("token");

  if (!token) {
    if (routeName === "/login") {
      <Navigate to="/" replace />;
    }
  }
  return children;
}
