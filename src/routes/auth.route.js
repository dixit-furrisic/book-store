import express from "express"
import { login, register } from "../controllers/auth.controller.js";
import uploadProfileImage from "../middlewares/profileUploadMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", uploadProfileImage.single("profileImage"), register)

export default router