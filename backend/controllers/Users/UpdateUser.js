import User from "../../modals/Users/UserModal.js";

const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, contact, course } = req.body;

    const currentUser = await User.findOne({ id });

    if (!currentUser) {
      return res.status(404).json({ error: "User Not Found" });
    }

    const file = req.file
      ? req.file.filename
      : currentUser !== null
      ? currentUser.profile
      : null;

    const updateData = { profile: file, name, email, contact, course };

    const UpdatedUser = await User.findOneAndUpdate(
      { id: id },
      { $set: updateData },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "User Updated Successfully", UpdatedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default UpdateUser;
