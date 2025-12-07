const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const validateRegister = (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  if (!emailRegex.test(email))
    return res.status(400).json({ message: "Invalid email format" });
  if (!passRegex.test(password))
    return res.status(400).json({ message: "Password must be >=8 chars with letters and numbers" });
  next();
};

export default { validateRegister };
