import React from "react";
import { Link } from "react-router-dom";

export default function Home(props) {
  return (
    <>
      <div
        className={`container-fluid ${
          props.theme === "sun" ? "bg-white" : "bg-black"
        } position-relative p-0`}
      >
        <nav
          className={`navbar navbar-expand-lg navbar-${
            props.theme === "sun" ? "light" : "dark"
          } w-100 bg-sec-custom position-fixed`}
        >
          <div className="container-fluid">
            <Link className="navbar-brand text-red  fw-semibold" to="/">
              <i className="fa fa-user-edit me-2"></i>BCA
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <button
                    onClick={props.handleTheme}
                    className="sidebar-toggler flex-shrink-0 m-0 ms-2"
                  >
                    <i className={`fa fa-${props.theme}`}></i>
                  </button>
                </li>
              </ul>
              <Link to={`/sign-in`} className="btn btn-red" type="submit">
                Sign In
              </Link>
            </div>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="row vh-100 text-center align-items-center justify-content-center">
            <div className="col-md-4">
              <div className="p-5 rounded bg-sec-custom">
                <h1 className="display-1 fw-bold">Home</h1>
                <p>
                  For Access The All Data, Please
                  <Link to={`/sign-in`} className="ms-2">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
