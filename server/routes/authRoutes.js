import express from "express";
import { isAuthenticated, login, logout, register, resetPasswordOtp, sendVerifyOtp, verifyEmail, verifyResetPassword } from "../controllers/authControllers.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp)
authRouter.post('/verify-account', userAuth,  verifyEmail)
authRouter.post('/isAuth', userAuth,  isAuthenticated)
authRouter.post('/send-reset-otp', resetPasswordOtp)
authRouter.post('/reset-password', verifyResetPassword)

export default authRouter;