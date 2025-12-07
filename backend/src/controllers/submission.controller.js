import Submission from "../models/submission.model.js";
import Exam from "../models/exam.model.js";

const submitExam = async (req, res) => {
  try {
    // body: { examId, answers: [choiceIndex, ...] }
    const { examId, answers } = req.body;
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    if (!Array.isArray(answers) || answers.length !== exam.questions.length) {
      return res.status(400).json({ message: "Answers length mismatch" });
    }

    // calculate
    let correct = 0;
    for (let i = 0; i < exam.questions.length; i++) {
      const q = exam.questions[i];
      if (answers[i] === q.correctAnswer) correct++;
    }

    const score = Math.round((correct / exam.questions.length) * 10 * 10) / 10; // scale 0..10 with 1 decimal
    const submission = await Submission.create({
      userId: req.user._id,
      examId,
      answers: answers.map((choiceIndex, idx) => ({ questionIndex: idx, choiceIndex })),
      score
    });

    return res.json({ message: "Submitted", score, correct, total: exam.questions.length, submissionId: submission._id });
  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export default { submitExam };
