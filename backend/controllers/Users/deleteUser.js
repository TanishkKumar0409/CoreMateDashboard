import User from "../../modals/Users/UserModal.js";

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findOneAndDelete({ id });

    if (deletedUser) {
      return res
        .status(201)
        .json({ message: "User Deleted Successfully", deletedUser });
    } else {
      return res.status(404).json({ error: "User Does Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default deleteUser;
