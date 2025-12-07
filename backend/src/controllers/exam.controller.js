import Exam from "../models/exam.model.js";
import generateCode from "../utils/generateExamCode.util.js"
export default {
  createExam: async (req, res) => {
    try {
      const exam = await Exam.create({
        ...req.body,
        code: generateCode(),   // ⭐ Tự động sinh mã đề
        createdBy: req.user.id
      });

      res.json({ message: "Created", exam });
    } catch (err) {
      console.error("CREATE EXAM ERROR:", err);
      res.status(500).json({ message: "Create exam failed" });
    }
  },

  getMyExams: async (req, res) => {
    try {
      const exams = await Exam.find({ createdBy: req.user._id }); // ✅ FIXED
      res.json(exams);
    } catch (err) {
      res.status(500).json({ message: "Load exam failed" });
    }
  },

  getExamByCode: async (req, res) => {
    try {
      const exam = await Exam.findOne({ code: req.params.code });
      if (!exam) return res.status(404).json({ message: "Not found" });

      res.json({ exam });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },

  getExamById: async (req, res) => {
    try {
      const exam = await Exam.findById(req.params.id);
      if (!exam) return res.status(404).json({ message: "Not found" });

      res.json({ exam });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },

  submitExam: async (req, res) => {
    try {
      const exam = await Exam.findById(req.params.id);
      if (!exam) return res.status(404).json({ message: "Not found" });

      const { answers } = req.body;
      let correct = 0;

      exam.questions.forEach((q, i) => {
        if (q.correctAnswer === answers[i]) correct++;
      });

      const score = Math.round((correct / exam.questions.length) * 10);

      res.json({
        correct,
        total: exam.questions.length,
        score,
      });
    } catch (err) {
      res.status(500).json({ message: "Submit failed" });
    }
  },
  deleteExam: async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    // only owner (teacher who created) can delete
    if (String(exam.createdBy) !== String(req.user._id)) {
      return res.status(403).json({ message: "You are not allowed to delete this exam" });
    }

    await Exam.deleteOne({ _id: exam._id });

    return res.json({ message: "Exam deleted" });
  } catch (err) {
    console.error("DELETE EXAM ERROR:", err);
    return res.status(500).json({ message: "Delete failed", error: err.message });
  }
  }

}
