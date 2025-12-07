import api from "../api/axiosClient.js";

const register = (data) => api.post("/auth/register", data);
const login = (data) => api.post("/auth/login", data);

export default { register, login };
