import express from "express";
const app = express();
import cors from "cors";
import "dotenv/config.js";
import mongoose from "mongoose";
import userRoutes from "./src/routes/users.js";
import authRoutes from "./src/routes/auth.js";

import { MONGODB_SRV_STRING } from "./src/constants/config.js";


mongoose.set('strictQuery', true);
mongoose
  .connect(MONGODB_SRV_STRING)
  .then((success) => {
    console.log("Successfuly connected to MongoDB !!");
  })
  .catch((err) => {
    console.log("Error in mongoose connection !");
    console.log(err);
  });


app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

// 404 pages for development
app.get("*", (req, res) => {
    res.status(404).send("API not found :(  <br> ¯\\_(ツ)_/¯");
  });