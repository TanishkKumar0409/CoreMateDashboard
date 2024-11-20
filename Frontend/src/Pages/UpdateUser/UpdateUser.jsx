import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FileAPI } from "../../Services/API/API";
import { addUserValidationSchema } from "../../Helper/FormikValidationSchemas/ValidationSchemas";

export default function UpdateUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await FileAPI.get(`/user/${id}`);
        setUser(response.data);
      } catch (error) {
        toast.error("Failed to fetch user data");
      }
    };

    fetchUser();
  }, [id]);

  const initialValues = user
    ? {
        name: user.name,
        email: user.email,
        contact: user.contact,
        course: user.course,
        file: null,
      }
    : {
        name: "",
        email: "",
        contact: "",
        course: "",
        file: null,
      };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("contact", values.contact);
    formData.append("course", values.course);
    if (values.file) formData.append("profile", values.file);

    try {
      const response = await FileAPI.put(`/user/update/${id}`, formData);

      if (response.status === 200) {
        toast.success(response.data.message);
        Navigate("/manage-user");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addUserValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4 justify-content-center">
        <div className="col-sm-12 col-xl-6">
          <div className="bg-sec-custom rounded h-100 p-4">
            <h2 className="mb-4">Update User</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="file" className="form-label">
                  Upload File (optional)
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  className="form-control"
                  onChange={(event) => {
                    formik.setFieldValue("file", event.currentTarget.files[0]);
                  }}
                />
                {formik.touched.file && formik.errors.file && (
                  <div className="text-danger">{formik.errors.file}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
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
                <label htmlFor="course" className="form-label">
                  Course
                </label>
                <select
                  id="course"
                  name="course"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.course}
                >
                  <option value="">Select a course</option>
                  <option value="BCA">BCA</option>
                  <option value="BBA">BBA</option>
                  <option value="BA">BA</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="MCA">MCA</option>
                  <option value="MBA">MBA</option>
                  <option value="MA">MA</option>
                  <option value="M.Tech">M.Tech</option>
                </select>
                {formik.touched.course && formik.errors.course && (
                  <div className="text-danger">{formik.errors.course}</div>
                )}
              </div>

              <div className="text-end">
                <button type="submit" className="btn btn-red">
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
