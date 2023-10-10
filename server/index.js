import express from "express"
import connectDB from "./config/db.js"
import router from "./routes/authRoutes.js"
import cors from "cors"
const app = express()
connectDB()
app.use(express.json())
app.use(cors())
app.use("/api",router)

app.get("/",(req,resp)=>{
    resp.json("Hello Abhinav")
})
app.listen(9000,()=>{
    console.log("server started")
})