import Admin from "../../modals/Admins/Admin.js";

const getIdAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const getAdmin = await Admin.findOne({ id });
    if (getAdmin) {
      return res.status(201).json({ getAdmin });
    } else {
      return res.status(404).json({ error: "Admin Does Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default getIdAdmin;
