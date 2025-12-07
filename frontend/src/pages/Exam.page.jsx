import React, { useEffect, useState } from "react";
import examService from "../services/exam.service.js";
import "../styles/exam.css";
import Swal from "sweetalert2";

export default function ExamsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1200);
    });
  };

  const handleDelete = (id, title) => {
    Swal.fire({
      title: "Bạn có chắc chắn?",
      html: `Xóa đề: <b>${title}</b>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await examService.deleteExam(id);
          setExams((prev) => prev.filter((exam) => exam._id !== id));
          Swal.fire("Đã xóa!", res.data?.message || "Đã xóa đề thi", "success");
        } catch (err) {
          console.error("DELETE ERROR (frontend):", err);
          const msg =
            err.response?.data?.message || err.message || "Delete failed";
          Swal.fire("Lỗi!", msg, "error");
        }
      }
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await examService.getMyExams();
        setExams(res.data);
      } catch (err) {
        console.error("LOAD EXAMS ERROR:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className='loading'>
        <p>Loading....</p>
      </div>
    );

  return (
    <div className='exam-list'>
      <h2>Đề thi đã tạo</h2>

      {exams.length === 0 && <p>Không có đề nào</p>}

      <div className='list-container'>
        {exams.map((e, ei) => (
          <div className='exam-details' key={ei}>
            <div>
              <div className='num'>
                <p>{ei + 1}</p>
              </div>

              <div className='list-title'>
                <p>{e.title}</p>
              </div>

              <div className='list-time'>
                <p>Thời gian: {e.durationMinutes} phút</p>
              </div>
            </div>
            <div class='right'>
              <div className='list-code'>
                <p>
                  Mã đề: {e.code}
                  <button
                    className='copy-btn'
                    onClick={() => handleCopy(e.code, ei)}
                  >
                    {copiedIndex === ei ? "Đã copy" : "Copy"}
                  </button>
                </p>
              </div>

              <div className='list-delete'>
                <button
                  className='delete-btn'
                  onClick={() => handleDelete(e._id, e.title)}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
