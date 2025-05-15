import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDb from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js";

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 4000;

connectDb()
const allowedOrigins = ['https://mernauth-frontend-xjpd.onrender.com']

app.use(cookieParser())
app.use(cors({ origin : allowedOrigins, credentials : true}))

// API endpoints 
app.get("/", (req, res) => res.send("Project succeccfull started."))
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)



app.listen(PORT, () => console.log(`Server is running at ${PORT}`))

