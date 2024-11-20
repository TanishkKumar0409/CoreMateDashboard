import React from "react";
import { Navigate, useLocation, useMatch } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const restrictedPaths = [
    "/dashboard",
    "/add-user",
    "/manage-user",
    "/products",
  ];
  const dynamicRoutes = [
    useMatch("/view/:id"),
    useMatch("/admin/:id"),
    useMatch("/update-admin/:id"),
    useMatch("/update-user/:id"),
  ];

  if (
    !token &&
    (restrictedPaths.includes(location.pathname) || dynamicRoutes.some(Boolean))
  ) {
    return <Navigate to="/sign-in" replace />;
  }

  if (token) {
    if (["/sign-in", "/sign-up"].includes(location.pathname)) {
      return <Navigate to="/" replace />;
    }
    if (location.pathname === "/") {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}
