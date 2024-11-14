import Admin from "../../modals/Admins/Admin.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const privateKey = "tanishk";

    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      return res
        .status(404)
        .json({ error: "Email not found, please create your account" });
    }

    const isMatch = await bcryptjs.compare(password, existingAdmin.password);
    if (!isMatch) {
      return res.status(404).json({ error: "Incorrect password" });
    }

    var token = jwt.sign({ email, password }, privateKey);

    return res.status(200).json({ message: "Login successful", token,existingAdmin });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default login;
