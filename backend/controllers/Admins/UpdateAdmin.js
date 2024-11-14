import Admin from "../../modals/Admins/Admin.js";
import bcryptjs from "bcryptjs";

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, contact, password } = req.body;
    const file = req.file ? req.file.filename : null;

    let updateFields = { profile: file, name, email, contact };

    if (password) {
      const salt = bcryptjs.genSaltSync(10);
      const hash = bcryptjs.hashSync(password, salt);
      updateFields.password = hash;
    }

    const updatedUser = await Admin.findOneAndUpdate(
      { id },
      { $set: updateFields },
      { new: true }
    );

    if (updatedUser) {
      return res
        .status(201)
        .json({ message: "Admin Updated Successfully", updatedUser });
    } else {
      return res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default updateAdmin;
