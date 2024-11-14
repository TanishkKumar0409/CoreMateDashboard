import User from "../../modals/Users/UserModal.js";

const addUser = async (req, res) => {
  try {
    const { name, email, contact, course } = req.body;

    const file = req.file ? req.file.filename : null;

    const lastUser = await User.findOne().sort({ id: -1 });
    const id = lastUser ? lastUser.id + 1 : 1;

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ error: "Email Already Exist." });
    }
    const existingUserByContact = await User.findOne({ contact });
    if (existingUserByContact) {
      return res.status(400).json({ error: "Contact Already Exist." });
    }

    const newUser = User({
      id,
      profile: file,
      name,
      email,
      contact,
      course,
    });

    const savedUser = await newUser.save();

    return res
      .status(201)
      .json({ message: "User Saved Successfully", savedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default addUser;
