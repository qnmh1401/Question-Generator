import React from "react";
import "../styles/dashboard.css";
import phong1 from "../assets/phong1.png";
import phong2 from "../assets/phong2.png";
import phong3 from "../assets/phong3.png";
import phong4 from "../assets/phong4.png";

export default function DashboardPage() {
  return (
    <div className='dashboard-container'>
      <div class='slide1 '>
        <div>
          <h1>NỀN TẢNG KẾT NỐI TRỰC TUYẾN</h1>
          <p>giữa giáo viên và học sinh</p>
        </div>

        <img src={phong2} />
      </div>
      <div class='slide1'>
        <img src={phong3} />
        <div>
          <h1>ĐƠN GIẢN - HIỆU QUẢ - TIẾT KIỆM</h1>
          <p>tạo đề thi nhanh chóng</p>
        </div>
      </div>
      <div class='slide1 '>
        <div>
          <h1>GIAO DIỆN ĐẸP - ĐẦY ĐỦ TÍNH NĂNG</h1>
          <p>hỗ trợ học sinh và giáo viên tối đa</p>
        </div>

        <img src={phong1} />
      </div>

      <footer class='footer'>
        <div class='footer-container'>
          <div class='footer-section'>
            <h3>Về chúng tôi</h3>
            <p>
              Nền tảng tạo và quản lý đề thi trực tuyến dành cho giáo viên THPT.
            </p>
          </div>

          <div class='footer-section'>
            <h3>Điều khoản & Chính sách</h3>
            <ul>
              <li>
                <a href='#'>Điều khoản sử dụng</a>
              </li>
              <li>
                <a href='#'>Chính sách bảo mật</a>
              </li>
              <li>
                <a href='#'>Quy định tạo đề thi</a>
              </li>
            </ul>
          </div>

          <div class='footer-section'>
            <h3>Thông tin liên hệ</h3>
            <p>Số điện thoại: +84 778842709 (Mr. Hoàng)</p>
            <p>Email: hoangquach512@gmail.com(admin)</p>
            <p>Địa chỉ: Hóc Môn, TP. Hồ Chí Minh</p>
          </div>
        </div>

        <div class='footer-bottom'>
          <p>© 2025 Bản quyền thuộc về Hệ thống thi trực tuyến</p>
        </div>
      </footer>
    </div>
  );
}
