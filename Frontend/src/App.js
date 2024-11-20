import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./Pages/Dashboard/Dashboard";
import AddUser from "./Pages/AddUser/AddUser";
import ManageUser from "./Pages/ManageUser/ManageUser";
import SignIn from "./Pages/Forms/SignIn/SignIn";
import SignUp from "./Pages/Forms/SignUp/SignUp";
import Home from "./Pages/Home/Home";
import View from "./Pages/View/View";
import AdminProfile from "./Pages/View/AdminProfile/AdminProfile";
import AllProducts from "./Pages/Products/AllProducts";
import DashboardLayout from "./Layouts/DashboardLayout";
import UpdateAdminForm from "./Pages/Forms/UpdateForm/UpdateAdminForm";
import UpdateUser from "./Pages/UpdateUser/UpdateUser";
import ProtectedRoutes from "./Helper/Routes/ProtectedRoutes";

function App() {
  const [theme, setTheme] = useState("moon");

  const handleTheme = () => {
    setTheme(theme === "sun" ? "moon" : "sun");
  };

  const light = {
    "--primary": "#007bff",
    "--primary-hover": "#0056b3",
    "--secondary": "#ebedef",
    "--light": "#000000",
    "--dark": "#ffffff",
  };

  const dark = {
    "--primary": "#0a84ff",
    "--primary-hover": "#0066cc",
    "--secondary": "#191c24",
    "--light": "#6c7293",
    "--dark": "#000000",
  };

  return (
    <div style={theme === "sun" ? light : dark}>
      <BrowserRouter>
        <ToastContainer
          theme={theme === "sun" ? "light" : "dark"}
          position="top-center"
        />
        
        <Routes>
          <Route
            element={
              <ProtectedRoutes>
                <DashboardLayout handleTheme={handleTheme} theme={theme} />
              </ProtectedRoutes>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/manage-user" element={<ManageUser />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="/admin/:id" element={<AdminProfile />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/update-admin/:id" element={<UpdateAdminForm />} />
            <Route path="/update-user/:id" element={<UpdateUser />} />
          </Route>

          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home handleTheme={handleTheme} theme={theme} />
              </ProtectedRoutes>
            }
          />
          <Route path="/sign-in" element={<SignIn theme={theme} />} />
          <Route path="/sign-up" element={<SignUp theme={theme} />} />
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
