import jwt from "jsonwebtoken"
import config from "config"
// import { SECRET_KEY } from "../../_config.js"

export const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next()
  }

  try {
    const token = req.headers.authorization?.split(" ")[1]
    console.log("DEBUG ", token)
    const { id } = jwt.verify(token, config.get("server.secretKey"))
    req.jwtID = id
    next()
  } catch (e) {
    console.log("[JWT] AuthMiddleware: JWT isn't valid")
    res.status(403).json({ message: "Access denied!", e })
  }
}
