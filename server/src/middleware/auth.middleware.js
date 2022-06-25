import jwt from 'jsonwebtoken'
import config from 'config'
import { logger } from '../utils/logger.js'

export const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization?.split(' ')[1]
    // logger.debug("[JWT] AuthMiddleware: ", token)
    const { id } = jwt.verify(token, config.get('server.secretKey'))
    req.jwtID = id
    next()
  } catch (e) {
    logger.warning('[JWT] AuthMiddleware: JWT isn\'t valid')
    res.status(403).json({ message: 'Access denied!', e })
  }
}
