import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import 'dotenv/config'
import { router } from './api/authRouter.js'
import corsMiddleware from './middleware/cors.middleware.js'
import { logger } from './utils/logger.js'
import { checkStaticFolder } from './services/fileServices.js'

const app = express()
app.use(
  '/static',
  express.static(path.join(path.resolve(), process.env.STATIC_FOLDER_NAME))
)
app.use(corsMiddleware)
app.use(express.json())
app.use('/api', router)

checkStaticFolder(process.env.STATIC_FOLDER_NAME)

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
