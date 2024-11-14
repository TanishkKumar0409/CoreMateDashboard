import express from "express";
import multer from "multer";

import addAdmin from "../controllers/Admins/AddAdmin.js";
import login from "../controllers/Admins/login.js";
import deleteAdmin from "../controllers/Admins/DeleteAdmin.js";
import getIdAdmin from "../controllers/Admins/getAdminById.js";
import updateAdmin from "../controllers/Admins/UpdateAdmin.js";

import addUser from "../controllers/Users/AddUser.js";
import getAllUsers from "../controllers/Users/getAllUsers.js";
import getIdUser from "../controllers/Users/getUserById.js";
import UpdateUser from "../controllers/Users/UpdateUser.js";
import deleteUser from "../controllers/Users/deleteUser.js";

const router = express.Router();

const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./");
  },
  filename: function (req, file, cb) {
    cb(null, "Uploads/Admin/" + file.originalname);
  },
});

const upload1 = multer({ storage: storage1 });

router.post("/admin/add", upload1.single("profile"), addAdmin);
router.post("/admin/login", login);
router.delete("/admin/delete/:id", deleteAdmin);
router.put("/admin/update/:id", upload1.single("profile"), updateAdmin);
router.get("/admin/:id", getIdAdmin);

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./");
  },
  filename: function (req, file, cb) {
    cb(null, "Uploads/Users/" + file.originalname);
  },
});

const upload2 = multer({ storage: storage2 });

router.post("/user/add", upload2.single("profile"), addUser);
router.get("/user/all", getAllUsers);
router.get("/user/:id", getIdUser);
router.put("/user/update/:id", upload2.single("profile"), UpdateUser);
router.delete("/user/delete/:id", deleteUser);

export default router;
