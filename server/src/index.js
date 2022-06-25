import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import config from 'config'
import { router } from './api/authRouter.js'
import corsMiddleware from './middleware/cors.middleware.js'
import { logger } from './utils/logger.js'

const app = express()
app.use('/static', express.static(path.join(
  path.resolve(), config.get('server.staticFolderName')
)))
app.use(corsMiddleware)
app.use(express.json())
app.use('/api', router)

const PORT = config.get('server.port')
app.listen(PORT, () => {
  logger.info(`[Express] Server started on port ${PORT}`)
})

const connectDB = async () => {
  try {
    await mongoose.connect(config.get('dbConfig.connectonString'))
    logger.info('[MongoDB] Connect to DataBase')
  } catch (e) {
    logger.error(e)
  }
}
connectDB()
