import React, { useEffect, useRef, useState } from "react";
import examService from "../services/exam.service.js";
import "../styles/doexam.css";
import Swal from "sweetalert2";

export default function StudentDoExam() {
  const [code, setCode] = useState("");
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  const load = async () => {
    try {
      const res = await examService.getExamByCode(code);
      setExam(res.data.exam);
      setAnswers(new Array(res.data.exam.questions.length).fill(null));
      setTimeLeft(res.data.exam.durationMinutes * 60);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            handleSubmit();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } catch (err) {
      Swal.fire({
        title: "Lỗi!",
        text: "Không tìm thấy đề",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const selectAnswer = (i, choiceIndex) => {
    const a = [...answers];
    a[i] = choiceIndex;
    setAnswers(a);
  };

  const handleSubmit = async () => {
    const confirm = await Swal.fire({
      title: "Bạn chắc chắn muốn nộp bài?",
      text: "Hãy kiểm tra thật kỹ trước khi nộp!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Nộp bài",
      cancelButtonText: "Làm tiếp",
    });

    if (!confirm.isConfirmed) return; // nếu bấm "Làm tiếp" thì dừng lại

    try {
      const res = await examService.submitExam(exam._id, answers);
      const minutesSpent = exam.durationMinutes - Math.floor(timeLeft / 60);

      await Swal.fire({
        title: "Kết quả bài làm",
        html: `
        <p><b>Điểm:</b> ${res.data.score}</p>
        <p><b>Số câu đúng:</b> ${res.data.correct}/${res.data.total}</p>
        <p><b>Thời gian làm bài:</b> ${minutesSpent} phút</p>
      `,
        icon: "success",
        confirmButtonText: "OK",
      });
      setExam(null);
      setCode("");

      if (timerRef.current) clearInterval(timerRef.current);
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Lỗi!",
        text: err.response?.data?.message || "Submit failed",
        icon: "error",
      });
    }
  };

  const formatTime = (s) => {
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  return (
    <div className='doexam-container'>
      {!exam && (
        <div class='doexam-form'>
          <h2>Vào phòng thi</h2>
          <p>Vui lòng nhập mã đề thi</p>
          <div>
            <div class='input-exam'>
              <input
                placeholder='Exam code'
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <button onClick={load}>Vào thi</button>
          </div>
        </div>
      )}

      {exam && (
        <div class='doing-exam'>
          <div>
            <div class='title'>
              <h3>{exam.title}</h3>
              <p>Thời gian còn lại: {formatTime(timeLeft)}</p>
            </div>

            {exam.questions.map((q, i) => (
              <div key={i} class='question'>
                <p>{q.text}:</p>
                <div class='choice-form'>
                  {q.choices.map((c, idx) => (
                    <div>
                      <label class='choice' key={idx}>
                        <input
                          class='radio'
                          type='radio'
                          name={`q${i}`}
                          checked={answers[i] === idx}
                          onChange={() => selectAnswer(i, idx)}
                        />
                        {c}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button class='btn-submit' onClick={handleSubmit}>
              Nộp bài
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
