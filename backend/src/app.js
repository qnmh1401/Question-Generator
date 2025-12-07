import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import examRoutes from "./routes/exam.route.js";
import submissionRoutes from "./routes/submission.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/submissions", submissionRoutes);

// health
app.get("/", (req, res) => res.json({ ok: true }));

// connect mongo
mongoose.connect("mongodb+srv://hoangquach512_db_user:5EdwmxKgJy7Ehqpn@web91.hqrjgvo.mongodb.net/", { })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

export default app;
