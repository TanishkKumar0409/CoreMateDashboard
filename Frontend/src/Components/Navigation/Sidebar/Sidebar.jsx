import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar(props) {
  const location = useLocation();

  const getActiveClass = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const Admin = JSON.parse(localStorage.getItem("admin"));
  return (
    <>
      <div className={`sidebar pe-4 pb-3 ${props.openClass}`}>
        <nav className="navbar bg-sec-custom navbar-dark">
          <Link to="/" className="navbar-brand mx-4 mb-3">
            <h3 className="text-red">
              <i className="fa fa-user-edit me-2"></i>CoreMate
            </h3>
          </Link>

          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <Link to={`/`}>
                <img
                  src={`http://localhost:5000/${Admin.profile}`}
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                  alt=""
                />
              </Link>
              <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
            </div>

            <div className="ms-3">
              <Link to={`/dashboard`} className="text-decoration-none">
                <h6 className="mb-0">{Admin.name}</h6>
              </Link>
              <span>Admin</span>
            </div>
          </div>

          <div className="navbar-nav w-100">
            <Link
              to="/dashboard"
              className={`nav-item nav-link ${getActiveClass("/dashboard")}`}
            >
              <i className="fa fa-tachometer-alt me-2"></i>Dashboard
            </Link>

            <div className="nav-item dropdown">
              <button
                className="nav-link w-100 text-start dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-users me-2"></i>Users
              </button>

              <div className="dropdown-menu bg-transparent border-0">
                <Link
                  to="/dashboard/user/add"
                  className={`dropdown-item ${getActiveClass(
                    "/dashboard/user/add"
                  )}`}
                >
                  Add User
                </Link>
                <Link
                  to="/dashboard/user/all"
                  className={`dropdown-item ${getActiveClass(
                    "/dashboard/user/all"
                  )}`}
                >
                  Manage Users
                </Link>
              </div>
            </div>

            <Link
              to="/dashboard/products"
              className={`nav-item nav-link ${getActiveClass(
                "/dashboard/products"
              )}`}
            >
              <i className="fa fa-shopping-cart me-2"></i>Products
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
