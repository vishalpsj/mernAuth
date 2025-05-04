import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express()
const PORT = process.env.PORT || 4000;

app.use(express.json())
app.use(cors({credentials : true}))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Project succeccfull started.")
})

app.listen(PORT, () => console.log(`Server is running at ${PORT}`))

