import User from "../../modals/Users/UserModal.js";

const getIdUser = async (req, res) => {
  try {
    const { id } = req.params;
    const idUser = await User.findOne({ id });

    if (idUser) {
      return res.status(201).json(idUser);
    } else {
      return res.status(400).json({ error: "User Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default getIdUser;
