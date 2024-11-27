import React from "react";
import { Link } from "react-router-dom";

export default function TopBar(props) {
  const handleSignOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  const Admin = JSON.parse(localStorage.getItem("admin"));

  return (
    <>
      <nav className="navbar navbar-expand bg-sec-custom sticky-top px-4 py-0">
        <Link to="/dashboard" className="navbar-brand d-flex d-lg-none me-4">
          <h2 className="text-red mb-0">
            <i className="fa fa-user-edit"></i>
          </h2>
        </Link>

        <p
          onClick={props.toggleOpenClass}
          className="sidebar-toggler flex-shrink-0 m-0"
        >
          <i className="fa fa-bars"></i>
        </p>
        <button
          onClick={props.handleTheme}
          className="sidebar-toggler flex-shrink-0 m-0 ms-2"
        >
          <i className={`fa fa-${props.theme === "sun" ? "moon" : "sun"}`}></i>
        </button>
        <button
          onClick={props.toggleFullScreen}
          className="sidebar-toggler flex-shrink-0 m-0 ms-2"
        >
          <i className={`fas fa-${props.fullIcon}`}></i>
        </button>

        <div className="navbar-nav align-items-center ms-auto">
          <div className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <img
                src={`http://localhost:5000/${Admin.profile}`}
                style={{ width: "40px", height: "40px" }}
                alt=""
                className="rounded-circle me-lg-2"
              />
              <span className="d-none d-lg-inline-flex">{Admin.name}</span>
            </button>
            <div className="dropdown-menu dropdown-menu-end bg-sec-custom border-0 rounded-0 rounded-bottom m-0">
              <Link
                to={`/dashboard/admin/${Admin.id}`}
                className="dropdown-item"
              >
                My Profile
              </Link>
              <p className="dropdown-item" onClick={handleSignOut}>
                Sign Out
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
