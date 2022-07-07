import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { router } from './api/authRouter.js'
import { logger } from './utils/logger.js'
import { fileServices } from './services/fileServices.js'
import { errorMiddleware } from './middleware/error.middleware.js'

const app = express()
app.use(
  '/static',
  express.static(path.join(path.resolve(), process.env.STATIC_FOLDER_NAME))
)
// app.use(corsMiddleware)
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
)
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)
app.use(errorMiddleware)

fileServices.checkStaticFolder(process.env.STATIC_FOLDER_NAME)

const PORT = process.env.PORT || 5005

const startWithDB = async () => {
  try {
    app.listen(PORT, () => {
      logger.info(`[Express] Server started on port ${PORT}`)
    })
    await mongoose.connect(process.env.DB_STRING)
    logger.info('[MongoDB] Connect to DataBase')
  } catch (e) {
    logger.fatal(e)
  }
}
startWithDB()
