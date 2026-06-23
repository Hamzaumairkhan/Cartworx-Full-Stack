import express from "express";
import { register, loginUser, getUser, verifyOtp, resendOtp } from "../controllers/userController.js";
const router = express.Router();
import protect from "../middleware/authMiddleare.js";
import admin from "../middleware/adminMiddleware.js";

router.post("/register", register);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.get("/users", protect, admin, getUser);

export default router;
