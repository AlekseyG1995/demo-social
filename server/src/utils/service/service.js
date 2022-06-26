import config from 'config'
import jwt from 'jsonwebtoken'

export const generateAccessJWT = (id, avatar) => {
  return jwt.sign(
    { id, avatar }, config.get('server.secretKey'), { expiresIn: '12h' }
  )
}