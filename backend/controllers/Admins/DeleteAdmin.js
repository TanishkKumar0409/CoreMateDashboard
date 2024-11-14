import Admin from "../../modals/Admins/Admin.js";

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAdmin = await Admin.findOneAndDelete({ id });
    if (deletedAdmin) {
      return res.status(201).json({ message: "Admin Deleted Successfully" });
    } else {
      return res.status(404).json({ error: "Admin Does Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default deleteAdmin;4
