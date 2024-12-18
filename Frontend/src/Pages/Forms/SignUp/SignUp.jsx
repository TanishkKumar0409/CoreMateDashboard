import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { FileAPI } from "../../../Services/API/API";
import { SignUpValidationSchema } from "../../../Helper/FormikValidationSchemas/ValidationSchemas";

export default function SignUp(props) {
  const Navigate = useNavigate();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("contact", values.contact);
    formData.append("password", values.password);
    formData.append("profile", values.profile);

    try {
      const response = await FileAPI.post("/admin/add", formData);
      toast.success(response.data.message);

      const token = response.data.token;
      const adminData = JSON.stringify(response.data.savedAdmin);

      localStorage.setItem("token", token);
      localStorage.setItem("admin", adminData);

      Navigate("/");

      window.location.reload();
    } catch (error) {
      if (error.status === 404) {
        toast.error(error.response.data.error);
      } else if (error.status === 400) {
        toast.error(error.response.data.error);
      } else if (error.status === 500) {
        toast.error(error.response.data.error);
      }
    }
  };

  const initialValues = {
    name: "",
    email: "",
    contact: "",
    password: "",
    profile: null,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignUpValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleFileChange = (e) => {
    formik.setFieldValue("profile", e.currentTarget.files[0]);
  };

  return (
    <div className="container-fluid">
      <div
        className={`row h-100 ${
          props.theme === "sun" ? "bg-white" : "bg-black"
        } align-items-center justify-content-center`}
        style={{ minHeight: "100vh" }}
      >
        <div className="col-12 col-sm-8 col-md-6 col-lg-5 content-center">
          <div className="bg-sec-custom rounded p-4 p-sm-5 my-4 mx-3">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <Link to="/">
                <h3 className="text-red">
                  <i className="fa fa-user-edit me-2"> CoreMate </i>
                </h3>
              </Link>
              <h3>Sign Up</h3>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="profile" className="form-label">
                  Upload Profile
                </label>
                <input
                  type="file"
                  id="profile"
                  name="profile"
                  className="form-control"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                />
                {formik.touched.profile && formik.errors.profile && (
                  <div className="text-danger">{formik.errors.profile}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="name"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-danger">{formik.errors.name}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="email"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-danger">{formik.errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="contact" className="form-label">
                  Contact
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  className="form-control"
                  value={formik.values.contact}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="tel"
                />
                {formik.touched.contact && formik.errors.contact && (
                  <div className="text-danger">{formik.errors.contact}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="new-password"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-danger">{formik.errors.password}</div>
                )}
              </div>

              <div className="d-flex align-items-center justify-content-end mb-4">
                <a href="/">Forgot Password</a>
              </div>
              <button type="submit" className="btn btn-red py-3 w-100 mb-4">
                Sign Up
              </button>
              <p className="text-center mb-0">
                Already Have an account? <Link to="/sign-in">Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
