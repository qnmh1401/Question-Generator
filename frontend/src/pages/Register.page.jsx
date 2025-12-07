import React, { useState } from "react";
import authService from "../services/auth.service.js";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(form);
      alert("Registered, please login");
      navigate("/login");
    } catch (err) {
      Swal.fire({
        title: "Lỗi!",
        text: err.response?.data?.message || "Register failed",
        icon: "error",
      });
    }
  };

  return (
    <div className='register-container'>
      <h2>ĐĂNG KÝ TÀI KHOẢN</h2>
      <form onSubmit={onSubmit}>
        <div class='input'>
          <input name='name' placeholder='Full name' onChange={onChange} />
        </div>
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

        <select name='role' onChange={onChange} value={form.role}>
          <option value='student'>Student</option>
          <option value='teacher'>Teacher</option>
        </select>
        <button type='submit'>ĐĂNG KÝ</button>
      </form>
    </div>
  );
}
