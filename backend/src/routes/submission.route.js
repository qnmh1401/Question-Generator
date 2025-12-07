import express from "express";
import controller from "../controllers/submission.controller.js";
import mw from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/submit", mw.auth, mw.isStudent, controller.submitExam);

export default router;
