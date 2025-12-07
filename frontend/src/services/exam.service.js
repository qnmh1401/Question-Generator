import api from "../api/axiosClient.js";

const createExam = (data) => api.post("/exams/create", data);
const getExamByCode = (code) => api.get(`/exams/code/${code}`);
const getExamById = (id) => api.get(`/exams/${id}`);
const submitExam = (examId, answers) => api.post("/submissions/submit", { examId, answers });
const getMyExams = () => api.get("/exams/me"); // optionally filter server-side
const deleteExam =(id) =>api.delete(`/exams/${id}`);



export default { createExam, getExamByCode, getExamById, submitExam, getMyExams, deleteExam };
