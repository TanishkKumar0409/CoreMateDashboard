import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FileAPI } from "../../../Services/API/API";
import { SignUpValidationSchema } from "../../../Helper/FormikValidationSchemas/ValidationSchemas";

export default function UpdateAdminForm() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await FileAPI.get(`/admin/${id}`);
        setData(response.data.getAdmin);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };
    getData();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("contact", values.contact);
      formData.append("password", values.password);
      formData.append("profile", values.profile);

      const response = await FileAPI.put(`admin/update/${id}`, formData);
      if (response.status === 201) {
        toast.success(response.data.message);

        const localData = JSON.stringify(response.data.updatedUser);

        localStorage.setItem("admin", localData);

        Navigate(`/admin/${id}`);

        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      email: data?.email || "",
      contact: data?.contact || "",
      password: "",
      profile: null,
    },
    validationSchema: SignUpValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4 justify-content-center">
          <div className="col-sm-12 col-xl-6">
            <div className="bg-sec-custom rounded h-100 p-4">
              <h2 className="mb-4">Update Admin</h2>
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
                    onChange={(event) => {
                      formik.setFieldValue(
                        "profile",
                        event.currentTarget.files[0]
                      );
                    }}
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-danger">{formik.errors.name}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contact}
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
                    placeholder="Please Enter Your Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-danger">{formik.errors.password}</div>
                  )}
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-red">
                    Update Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
