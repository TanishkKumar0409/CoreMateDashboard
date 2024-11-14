import User from "../../modals/Users/UserModal.js";

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().sort({ id: 1 });

    if (allUsers) {
      return res.status(201).json(allUsers);
    } else {
      return res.status(400).json({ error: "No Data Available" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getAllUsers;
