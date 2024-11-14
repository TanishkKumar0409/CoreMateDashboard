import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/index.js";
import getAllUsers from "./controllers/Users/getAllUsers.js";

dotenv.config();

const port = process.env.PORT;
const DbName = process.env.DbName;

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/api/", router);

app.use(express.static("public"));
app.use("/Uploads", express.static("Uploads"));

app.get("/user", getAllUsers);

mongoose
  .connect(DbName)
  .then(() => {
    console.log(`Database Connected`);
  })
  .catch((error) => {
    console.log({ error: error.message });
  });

app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});
