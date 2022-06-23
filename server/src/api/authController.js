import { validationResult } from "express-validator"
import { User } from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import fs from "fs"
import { v4 as uuidv4 } from "uuid"
import config from "config"

const generateAccessJWT = (id, avatar) => {
  const payload = {
    id,
    avatar,
  }

  console.log("[JWT] - generate : id = ", id, " img =  ", avatar)
  return jwt.sign(payload, config.get("server.secretKey"), { expiresIn: "12h" })
}

class AuthController {
  async profile(req, res) {
    const data = await User.findById(req.jwtID)
    return res.json({
      username: data.username,
      avatar: data.avatar,
    })
  }

  async getPrivateInfo(req, res) {
    const data = await User.find({ _id: { $ne: req.jwtID } })
    console.log("data: ", data)

    res.json({
      privateData: data.map((item) => {
        return {
          username: item.username,
          birthday: new Date().getFullYear() - new Date(item.birthday).getFullYear(),
          avatar: item.avatar,
        }
      }),
    })

    // return res.status(403).json({ message: "Acsess denied" })
  }

  async registration(req, res) {
    try {
      const validationErrors = validationResult(req)
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({ message: "Registration error", validationErrors })
      }

      console.log("[DEBUG] cliendData", req.body)
      const { username, email, password, gender, birthday } = req.body
      let avatar = null
      // console.log("[DEBUG] cliendDataALL: ", req.body)
      // console.log("[DEBUG] cliendDataFILE: ", req.file)
      // console.log("[DEBUG] uuidV4: ", uuidv4())

      if (req.file) {
        const { mimetype, originalname, buffer } = req.file
        if (mimetype !== "image/jpeg") {
          throw new Error("mimetype file is not correct")
        }
        const ext = originalname.split(".").pop()
        avatar = uuidv4() + "." + ext
        fs.createWriteStream(`./storage/${avatar}`).write(req.file.buffer)
      }

      const candidate = await User.findOne({ email })
      if (candidate) {
        return res.status(400).json({ message: "User with current email already exists" })
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      const user = new User({ username, password: hashPassword, email, gender, birthday, avatar })
      await user.save()
      return res.json({ message: "Registration has been sucsess" })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Registration error" })
    }
  }

  async login(req, res) {
    try {
      const { email = "", password = "" } = req.body
      console.log("[LOGIN]", email)
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: "This email not exists" })
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: "Password isn't valid" })
      }
      res.json({
        message: "login is sucseeful",
        token: generateAccessJWT(user._id, user.avatar),
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Login error" })
    }
  }

  async update(req, res) {
    try {
      const validationErrors = validationResult(req)
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({ message: "Registration error", validationErrors })
      }
      const { username, password = "" } = req.body
      let avatar = null

      const objChanges = { username }

      // my Validatation password
      if (password.length >= 8 && password.length <= 32) {
        objChanges["password"] = bcrypt.hashSync(password, 7)
      } else {
        if (password !== "") {
          throw new Error("mimetype file is not correct")
        }
      }

      if (req.file) {
        const { mimetype, originalname, buffer } = req.file
        if (mimetype !== "image/jpeg") {
          throw new Error("mimetype file is not correct")
        }
        const ext = originalname.split(".").pop()
        avatar = uuidv4() + "." + ext
        fs.createWriteStream(`./storage/${avatar}`).write(req.file.buffer)
        objChanges["avatar"] = avatar
      }
      const user = await User.findByIdAndUpdate({ _id: req.jwtID }, objChanges)
      // if (!user) {
      //   res.status(400).json({ message: "This username not exists" })
      // }
      // if (!bcrypt.compareSync(password, user.password)) {
      //   res.status(400).json({ message: "Password isn't valid" })
      // }
      // res.json({
      //   message: "login is sucseeful",
      //   token: generateAccessJWT(user._id, user.img),
      // })
      res.json({
        avatar: avatar,
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Update error" })
    }
  }
}

export const authController = new AuthController()
