import jwt from 'jsonwebtoken'
import { logger } from '../utils/logger.js'

export const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization?.split(' ')[1]
    // logger.debug("[JWT] AuthMiddleware: ", token)
    const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    req.jwtID = id
    next()
  } catch (e) {
    // eslint-disable-next-line quotes
    logger.debug("[JWT] AuthMiddleware: JWT isn't valid")
    return res.status(403).json({ message: 'Access denied!', e })
  }
}
