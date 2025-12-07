import express from "express";
import controller from "../controllers/auth.controller.js";
import validate from "../middlewares/validateUser.middleware.js";

const router = express.Router();

router.post("/register", validate.validateRegister, controller.register);
router.post("/login", controller.login);

export default router;
