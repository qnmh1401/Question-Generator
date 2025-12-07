import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register.page.jsx";
import LoginPage from "./pages/Login.page.jsx";
import DashboardPage from "./pages/dashboard.page.jsx";
import ExamsPage from "../src/pages/Exam.page.jsx";
import CreateExamPage from "./pages/CreateExams.page.jsx";
import DoExamPage from "./pages/StudentDoExam.page.jsx";
import Navbar from "./components/navbar.component.jsx";

import AuthProvider from "./context/auth.context.jsx";
import ProtectedRoute from "./components/protected.route.jsx";
import StudentRoute from "./components/student.route.jsx";
import TeacherRoute from "./components/teacher.route.jsx";
import logo from "./assets/logo1.png";

export default function App() {
  return (
    <AuthProvider>
      <title>Generate Contest</title>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<DashboardPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route
            path='/create-exam'
            element={
              <ProtectedRoute>
                <TeacherRoute>
                  <CreateExamPage />
                </TeacherRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path='/do-exam'
            element={
              <ProtectedRoute>
                <StudentRoute>
                  <DoExamPage />
                </StudentRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path='/exams'
            element={
              <ProtectedRoute>
                <ExamsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
