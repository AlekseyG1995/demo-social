import { validationResult } from 'express-validator'
import { User } from '../models/User.js'
import bcrypt from 'bcrypt'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../utils/logger.js'
import { generateAccessJWT } from '../utils/service/service.js'
import path from 'path'

const _currentHost = process.env.API_URL

class AuthController {
  async profile(req, res) {
    try {
      const data = await User.findById(req.jwtID)
      return res.json({
        username: data.username,
        avatar: new URL(`static/${data.avatar}`, _currentHost),
      })
    } catch (e) {
      logger.error('[api-profile] error, e')
    }
  }

  async people(req, res) {
    try {
      const data = await User.find({ _id: { $ne: req.jwtID } })

      return res.json({
        people: data.map((item) => {
          return {
            id: item._id,
            username: item.username,
            age:
              new Date().getFullYear() - new Date(item.birthday).getFullYear(),
            avatar: new URL(`static/${item.avatar}`, _currentHost),
          }
        }),
      })
    } catch (e) {
      logger.error('[api-getData] error, e')
    }
    // return res.status(403).json({ message: "Acsess denied" })
  }

  async registration(req, res) {
    try {
      const validationErrors = validationResult(req)
      if (!validationErrors.isEmpty()) {
        return res.status(422).json({
          message: 'Registration error',
          validationErrors,
        })
      }

      const { username, email, password, gender, birthday } = req.body
      let avatar = null

      if (req.file) {
        const { mimetype, originalname, buffer } = req.file
        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
          throw new Error('mimetype file is not correct')
        }

        const ext = originalname.split('.').pop()
        avatar = uuidv4() + '.' + ext

        fs.createWriteStream(
          path.join(path.resolve(), process.env.STATIC_FOLDER_NAME, avatar)
        ).write(buffer)
      }

      const candidate = await User.findOne({ email })
      if (candidate) {
        return res.status(400).json({
          message: 'User with current email already exists',
        })
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      const user = new User({
        username,
        password: hashPassword,
        email,
        gender,
        birthday,
        avatar,
      })
      await user.save()
      return res.json({ message: 'Registration has been success' })
    } catch (e) {
      logger.debug('[api-retistration] error : ', e)
      return res.status(400).json({ message: 'Registration error' })
    }
  }

  async login(req, res) {
    try {
      const { email = '', password = '' } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'This email not exists' })
      }
      if (!bcrypt.compareSync(password, user.password)) {
        // eslint-disable-next-line quotes
        return res.status(400).json({ message: "Password isn't valid" })
      }
      return res.json({
        message: 'login is successful',
        token: generateAccessJWT(user._id, user.avatar),
      })
    } catch (e) {
      logger.debug('[api-login] error : ', e)
      return res.status(400).json({ message: 'Login error' })
    }
  }

  async update(req, res) {
    try {
      const validationErrors = validationResult(req)
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({
          message: 'Registration error',
          validationErrors,
        })
      }
      const { username, password = '' } = req.body
      let avatar = null
      const objChanges = { username }

      // my Validatation password
      if (password.length >= 8 && password.length <= 32) {
        objChanges['password'] = bcrypt.hashSync(password, 7)
      } else {
        if (password !== '') {
          throw new Error('password is not correct')
        }
      }

      if (req.file) {
        const { mimetype, originalname, buffer } = req.file
        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
          throw new Error('mimetype file is not correct')
        }
        const ext = originalname.split('.').pop()
        avatar = uuidv4() + '.' + ext
        fs.createWriteStream(`./storage/${avatar}`).write(buffer)
        objChanges['avatar'] = avatar
      }
      // user = await User.findByIdAndUpdate({ _id: req.jwtID }, objChanges)
      await User.findByIdAndUpdate({ _id: req.jwtID }, objChanges)
      return res.json({
        avatar: avatar,
      })
    } catch (e) {
      logger.debug('[api-update] error : ', e)
      return res.status(400).json({ message: 'Update error' })
    }
  }
}

export const authController = new AuthController()
