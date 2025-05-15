// server.js

import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDb from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDb();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Allow only specific frontend origin and allow cookies
const allowedOrigins = ['https://mernauth-frontend-xjpd.onrender.com'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Routes
app.get("/", (req, res) => {
  res.send("Project successfully started.");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
