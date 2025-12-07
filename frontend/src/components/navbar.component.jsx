import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context.jsx";
import logo from "../assets/logo1.png";
import "../styles/navbar.css";
export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className='navbar'>
      <div class='left'>
        <div class='left-child'>
          <Link to='/'>
            <img class='logo' src={logo} alt='logo' />
          </Link>
          <Link class='element' to='/'>
            <p>Trang chủ</p>
          </Link>

          {user && user.role === "teacher" && (
            <>
              <Link class='element' to='/create-exam'>
                <p>Tạo đề thi</p>
              </Link>
              <Link class='element' to='/exams'>
                <h1 class='list-exam'>Danh sách đề thi</h1>
              </Link>
            </>
          )}

          {user && user.role === "student" && (
            <>
              <Link class='element' to='/do-exam'>
                <p>Làm bài thi</p>
              </Link>
            </>
          )}
        </div>
      </div>

      {!user && (
        <div class='login'>
          <div class='login-child'>
            <Link class='element' to='/login'>
              <p>Đăng nhập</p>
            </Link>
            <Link class='element' to='/register'>
              <p>Đăng ký</p>
            </Link>
          </div>
        </div>
      )}

      {user && (
        <div class='logoutbtn'>
          <div class='greeting'>
            <p>
              Xin chào, <span>{user.name}</span> !
            </p>
            <button onClick={logout}>ĐĂNG XUẤT</button>
          </div>
        </div>
      )}
    </nav>
  );
}
