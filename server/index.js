import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import searchRoutes from "./routes/search.js";
import paginationRoutes from "./routes/pagination.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/auth", authRoutes);
app.use("/search", searchRoutes);
app.use("/pagination", paginationRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect to Mongoose is SUCCESSFUL!!!!"))
  .catch((error) => console.log(`${error} did not connect`));

app.listen("5000", () => {
  console.log("Backend is running");
});
