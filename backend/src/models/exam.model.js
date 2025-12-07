import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: String,
  choices: [String],
  correctAnswer: Number // index of correct choice
});

const examSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  durationMinutes: { type: Number, default: 30 },
  questions: [questionSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

const Exam = mongoose.model("Exam", examSchema);
export default Exam;
