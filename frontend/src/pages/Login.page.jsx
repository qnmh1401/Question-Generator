import React, { useState } from "react";
import authService from "../services/auth.service.js";
import "../styles/login.css";
import { useAuth } from "../context/auth.context.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.login(form);
      login(res.data);
      navigate("/");
    } catch (err) {
      Swal.fire({
        title: "Lỗi!",
        text: err.response?.data?.message || "Login failed",
        icon: "error",
      });
    }
  };

  return (
    <div className='login-container'>
      <h2>ĐĂNG NHẬP TÀI KHOẢN</h2>
      <form onSubmit={onSubmit}>
        <div class='input'>
          <input name='email' placeholder='Email' onChange={onChange} />
        </div>
        <div class='input'>
          <input
            name='password'
            type='password'
            placeholder='Password'
            onChange={onChange}
          />
        </div>

        <button type='submit'>ĐĂNG NHẬP</button>
      </form>
    </div>
  );
}
