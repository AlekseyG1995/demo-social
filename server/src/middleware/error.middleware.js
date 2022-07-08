import { ApiError } from '../exceptions/apiError.js'
import { logger } from '../utils/logger.js'

export function errorMiddleware(err, req, res, next) {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors })
  }
  logger.fatal('[Error 500] , ', err)
  return res.status(500).json({ message: 'Server ERROR!' })
}
