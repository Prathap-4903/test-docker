import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
import { UserRouter } from './routes/user.js'

const app = express()
app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
}))
app.use(cookieParser())
app.use('/auth', UserRouter)

mongoose.connect('mongodb://localhost:27017/myformtest')
.then(() => {
  console.log("MongoDB Connected - myformtest/users")
})
.catch((err) => {
  console.log("Error Connecting to MongoDB: ", err)
})

mongoose.connection.on("disconnected", ()=> {
  console.log("Disconnected from MongoDB")
})

app.listen(process.env.PORT, () => {
  console.log("Server is Running on Port - 5000")
})