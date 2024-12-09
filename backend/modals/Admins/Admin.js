import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  verifyToken: {
    type: String
  },
  verifyTokenExpiry: {
    type: Date,
  }
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
