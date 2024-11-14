import Admin from "../../modals/Admins/Admin.js";
import bcryptjs from "bcryptjs";

const addAdmin = async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;

    const file = req.file ? req.file.filename : null;
    if (file === null) {
      return res.json(404).json({ error: "file is required" });
    }

    const lastAdmin = await Admin.findOne().sort({ id: -1 });

    const id = lastAdmin ? lastAdmin.id + 1 : 1;

    var salt = bcryptjs.genSaltSync(10);
    var hash = bcryptjs.hashSync(password, salt);

    const existingAdminByEmail = await Admin.findOne({ email });
    if (existingAdminByEmail) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const existingAdminByContact = await Admin.findOne({ contact });
    if (existingAdminByContact) {
      return res.status(400).json({
        error: "Contact number already exists.",
      });
    }

    const newAdmin = Admin({
      id: id,
      profile: file,
      name,
      email,
      contact,
      password: hash,
    });

    const savedAdmin = await newAdmin.save();

    if (savedAdmin) {
      return res.status(201).json({
        message: "User Saved Successfully",
        savedAdmin: savedAdmin,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default addAdmin;
