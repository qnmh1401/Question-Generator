import React, { useState } from "react";
import examService from "../services/exam.service.js";
import "../styles/create-exam.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function CreateExamsPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    durationMinutes: 30,
    questions: [{ text: "", choices: ["", "", "", ""], correctAnswer: 0 }],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...form.questions];
    updated[index][field] = value;
    setForm({ ...form, questions: updated });
  };

  const handleChoiceChange = (qi, ci, value) => {
    const updated = [...form.questions];
    updated[qi].choices[ci] = value;
    setForm({ ...form, questions: updated });
  };

  const addQuestion = () => {
    setForm({
      ...form,
      questions: [
        ...form.questions,
        { text: "", choices: ["", "", "", ""], correctAnswer: 0 },
      ],
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await examService.createExam(form);

      const code = res.data?.exam?.code;

      Swal.fire({
        title: "Tạo đề thành công!",
        html: `<b>Mã đề: ${code}</b>`,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Copy mã",
        cancelButtonText: "Đóng",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await navigator.clipboard.writeText(code);
          await Swal.fire({
            title: "Đã copy mã đề!",
            icon: "success",
          });
        }
        setForm({
          title: "",
          description: "",
          durationMinutes: 30,
          questions: [
            { text: "", choices: ["", "", "", ""], correctAnswer: 0 },
          ],
        });

        window.location.reload();
      });
    } catch (err) {
      Swal.fire({
        title: "Lỗi!",
        text: err.response?.data?.message || "Create failed",
        icon: "error",
      });
    }
  };

  return (
    <div className='create-exam'>
      <h2>TẠO ĐỀ THI</h2>

      <form onSubmit={onSubmit}>
        <p>Tiêu đề:</p>
        <input
          name='title'
          placeholder='Title'
          value={form.title}
          onChange={handleChange}
          required
        />
        <div class='create-input'>
          <p>Mô tả:</p>
          <textarea
            name='description'
            placeholder='Description'
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <p>Thời gian làm bài (phút):</p>
        <input
          name='durationMinutes'
          type='number'
          value={form.durationMinutes}
          onChange={handleChange}
          required
        />

        <h3 class='question-h3'>Nội dung câu hỏi</h3>

        {form.questions.map((q, qi) => (
          <div className='question-block' key={qi}>
            <p class='question-heading'>Câu hỏi {qi + 1}:</p>
            <textarea
              value={q.text}
              onChange={(e) => handleQuestionChange(qi, "text", e.target.value)}
              required
            />

            {q.choices.map((c, ci) => (
              <input
                key={ci}
                placeholder={`Lựa chọn ${ci + 1}`}
                value={c}
                onChange={(e) => handleChoiceChange(qi, ci, e.target.value)}
                required
              />
            ))}
            <p>Đáp án đúng:</p>

            <select
              value={q.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(
                  qi,
                  "correctAnswer",
                  Number(e.target.value)
                )
              }
            >
              <option value={0}>Lựa chọn 1</option>
              <option value={1}>Lựa chọn 2</option>
              <option value={2}>Lựa chọn 3</option>
              <option value={3}>Lựa chọn 4</option>
            </select>
          </div>
        ))}

        <div class='submission'>
          <div>
            <button
              class='btn-add create-btn'
              type='button'
              onClick={addQuestion}
            >
              + Add Question
            </button>

            <button class='btn-ok create-btn' type='submit'>
              Create Exam
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
