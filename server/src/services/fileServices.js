import fs from 'fs'
import { logger } from '../utils/logger.js'
import path from 'path'

class FileServices {
  checkStaticFolder = (folderName) => {
    try {
      const storagePath = path.join(path.resolve(), folderName)
      if (!fs.existsSync(storagePath)) {
        fs.mkdirSync(storagePath)
      }
    } catch (e) {
      logger.error('[fileServices] storageFolder Error!', e)
    }
  }

  saveFile = (path, data) => {
    try {
      fs.createWriteStream(path).write(data)
      logger.info('[fileServices] saveFile: ', path)
    } catch (e) {
      logger.error('[fileServices] saveFile Error!', e)
    }
  }

  deleteFile(path) {
    try {
      fs.unlinkSync(path);
      logger.info('[fileServices] deleteFile Complete!')
    } catch (e) {
      logger.warning('[fileServices] deleteFile Error!', e)
    }
  }
}
export const fileServices = new FileServices()
