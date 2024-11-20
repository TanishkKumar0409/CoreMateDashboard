import * as Yup from "yup";

export const signInValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const SignUpValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  name: Yup.string().required("Name is required"),
  contact: Yup.string()
    .matches(/^\d{10}$/, "Contact number must be 10 digits")
    .required("Contact is required"),
  profile: Yup.mixed()
    .required("Profile is required")
    .test("fileSize", "File size is too large (max: 5MB)", (value) => {
      return !value || (value && value.size <= 5 * 1024 * 1024);
    })
    .test("fileType", "Unsupported file format (only JPG/PNG)", (value) => {
      return (
        !value || (value && ["image/jpeg", "image/png"].includes(value.type))
      );
    }),
});

export const addUserValidationSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  contact: Yup.string()
    .matches(/^[0-9]{10}$/, "contact number must be 10 digits")
    .required("contact number is required"),
  course: Yup.string().required("Course selection is required"),
  file: Yup.mixed()
    .required("File is required")
    .test(
      "fileSize",
      "File is too large",
      (value) => value && value.size <= 1048576
    )
    .test(
      "fileType",
      "Unsupported File Format",
      (value) =>
        value &&
        ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
    ),
});
