import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionIndex: Number,
  choiceIndex: Number
});

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
  answers: [answerSchema],
  score: Number,
  createdAt: { type: Date, default: Date.now }
});

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
