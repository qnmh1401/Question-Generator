import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// register does NOT double-hash because model pre('save') hashes password
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email đã tồn tại" });

    const user = new User({ name, email, password, role });
    await user.save(); // <-- bắt buộc

    return res.json({ message: "Đăng ký thành công", user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Lỗi server" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN REQUEST:", req.body);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const isMatch = await user.comparePassword(password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


export default { register, login };
