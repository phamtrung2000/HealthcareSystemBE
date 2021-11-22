import express from "express";
const router = express.Router();
import {
  loginUser,
  otpSignup,
  registerUser,
  verityEmail,
  verifyOTP,
  loginWithFaceBook,
  changePassword,
  sendOTPEmail,
} from "../controller/auth.controller.js";

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/verifyEmail", verityEmail);
router.post("/otpSignup", otpSignup);
router.post("/verifyOTP", verifyOTP);
router.post("/loginFB", loginWithFaceBook);
router.post("/changePass", changePassword);
router.post("/sendOTP", sendOTPEmail);

export default router;
