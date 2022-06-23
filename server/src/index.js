// "username": "user1", "password": "12345678"
import express from "express"
import { router } from "./api/authRouter.js"
import mongoose from "mongoose"
import config from "config"
import multer from "multer"

// var upload = multer()
// var type = upload.single("file")

const app = express()

// app.use()
app.use(express.json())
// app.use(multer().single("file"))
app.use("/api", router)

const PORT = config.get('server.port')
app.listen(PORT, () => {
  console.log(`[Express] Server started on port ${PORT}`)
})

const connectDB = async () => {
  try {
    // await mongoose.connect(`mongodb+srv://qwerty:qwerty123@cluster0.b6pb9.mongodb.net/auth_roles?retryWrites=true&w=majority`)
    await mongoose.connect("mongodb://localhost:27017")
    console.log("[MongoDB] Connect to DataBase")
  } catch (e) {
    console.log(e)
  }
}
connectDB()