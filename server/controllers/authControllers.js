import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodeMailer.js";
import {
  generateEmailVerificationEmail,
  generatePasswordResetEmail,
  generatePasswordResetSuccessEmail,
  generateWelcomeEmail,
} from "../config/emailTemplate.js";

// Helper to sign and set token cookie
const setTokenCookie = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

// Register Controller
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    setTokenCookie(res, user._id);

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Heltron",
      html: generateWelcomeEmail(user),
    };
    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "New account created" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, message: "Email and Password are required." });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid password" });

    setTokenCookie(res, user._id);
    return res.json({ success: true, message: "User logged in" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Logout Controller
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.json({ success: true, message: "User logged out" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Send OTP for Email Verification
export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpiryAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account verification OTP",
      html: generateEmailVerificationEmail(user, otp),
    });

    return res.json({ success: true, message: "Verification OTP sent successfully." });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Verify Email
export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const userId = req.user.id;

  if (!otp || !userId) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.verifyOtp !== otp) return res.json({ success: false, message: "Invalid OTP" });
    if (user.verifyOtpExpiryAt < Date.now()) return res.json({ success: false, message: "OTP expired" });

    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpiryAt = 0;
    await user.save();

    return res.json({ success: true, message: "Email verified successfully" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Auth Check
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Request Password Reset OTP
export const resetPasswordOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.json({ success: false, message: "Email required" });

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not exists" });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpiredAt = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "OTP to reset Password",
      html: generatePasswordResetEmail(user, otp),
    });

    return res.json({ success: true, message: "OTP sent to your email" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Reset Password
export const verifyResetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not exists" });

    if (user.resetOtp !== otp) return res.json({ success: false, message: "Invalid OTP" });
    if (user.resetOtpExpiredAt < Date.now()) return res.json({ success: false, message: "OTP expired" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = '';
    user.resetOtpExpiredAt = 0;
    await user.save();

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset Successful",
      html: generatePasswordResetSuccessEmail(user),
    });

    return res.json({ success: true, message: "Password reset successfully." });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
