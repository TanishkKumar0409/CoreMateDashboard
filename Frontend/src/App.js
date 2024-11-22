import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";

import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DashboardLayout from "./Layouts/DashboardLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddUser from "./Pages/AddUser/AddUser";
import ManageUser from "./Pages/ManageUser/ManageUser";
import AdminProfile from "./Pages/View/AdminProfile/AdminProfile";
import View from "./Pages/View/View";
import AllProducts from "./Pages/Products/AllProducts";
import UpdateAdminForm from "./Pages/Forms/UpdateForm/UpdateAdminForm";
import UpdateUser from "./Pages/UpdateUser/UpdateUser";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/Forms/SignUp/SignUp";
import SignIn from "./Pages/Forms/SignIn/SignIn";
import ProtectedRoutes from "./Helper/Routes/ProtectedRoutes";

function App() {
  const [theme, setTheme] = useState("moon");

  const handleTheme = () => {
    setTheme(theme === "sun" ? "moon" : "sun");
  };

  return (
    <div className={theme === "sun" ? "light" : "dark"}>
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
