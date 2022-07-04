import jwt from 'jsonwebtoken'

export const generateAccessJWT = (id, avatar) => {
  return jwt.sign({ id, avatar }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '12h',
  })
}
