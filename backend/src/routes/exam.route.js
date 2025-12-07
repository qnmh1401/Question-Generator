import express from "express";
import controller from "../controllers/exam.controller.js";
import mw from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/create", mw.auth, mw.isTeacher, controller.createExam);
router.get("/me", mw.auth, mw.isTeacher, controller.getMyExams);
router.get("/code/:code", mw.auth, mw.isStudent, controller.getExamByCode);
router.post("/submit/:id", mw.auth, mw.isStudent, controller.submitExam);
router.get("/:id", mw.auth, controller.getExamById);
router.delete("/:id", mw.auth, mw.isTeacher, controller.deleteExam);

export default router;
