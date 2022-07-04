import fs from 'fs'
import { logger } from '../utils/logger.js'
import path from 'path'

export const checkStaticFolder = (folderName) => {
  try {
    const storagePath = path.join(path.resolve(), folderName)
    if (!fs.existsSync(storagePath)) {
      fs.mkdirSync(storagePath)
    }
  } catch (e) {
    logger.error('[fileServices] storageFolder Error!', e)
  }
}
