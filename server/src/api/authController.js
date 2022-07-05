import { validationResult } from 'express-validator'
// import { userModel } from '../models/User.js'
import bcrypt from 'bcrypt'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../utils/logger.js'
// import { generateAccessJWT } from '../utils/service/service.js'
// import path from 'path'
import { ApiError } from '../exceptions/apiError.js'
import { authService } from '../services/authService.js'

class AuthController {
  async profile(req, res) {
    // try {
    //   const data = await User.findById(req.jwtID)
    //   return res.json({
    //     username: data.username,
    //     avatar: new URL(`static/${data.avatar}`, process.env.API_URL),
    //   })
    // } catch (e) {
    //   logger.error('[api-profile] error, e')
    // }
  }

  async people(req, res) {
    // try {
    //   const data = await User.find({ _id: { $ne: req.jwtID } })
    //   return res.json({
    //     people: data.map((item) => {
    //       return {
    //         id: item._id,
    //         username: item.username,
    //         age:
    //           new Date().getFullYear() - new Date(item.birthday).getFullYear(),
    //         avatar: new URL(`static/${item.avatar}`, process.env.API_URL),
    //       }
    //     }),
    //   })
    // } catch (e) {
    //   logger.error('[api-getData] error, e')
    // }
    // // return res.status(403).json({ message: "Acsess denied" })
  }

  async registration(req, res, next) {
    try {
      const validationErrors = validationResult(req)
      if (!validationErrors.isEmpty()) {
        return next(
          ApiError.BadRequest('Validation Error', validationErrors.array())
        )
      }

      const { username, email, password, gender, birthday } = req.body
      const userDTO = await authService.registration({
        username,
        email,
        password,
        gender,
        birthday,
        file: req.file,
      })

      res
        .status(200)
        .json({ message: 'registration successful', user: userDTO })
    } catch (e) {
      logger.debug('[api-registration] error : ', e)
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const errorsValidator = validationResult(req)
      if (!errorsValidator.isEmpty()) {
        return next(
          ApiError.BadRequest('Validation Error', errorsValidator.array())
        )
      }

      const { email, password } = req.body
      const { user, accessToken, refreshToken } = await authService.login(
        email,
        password
      )
      res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json({ user, accessToken })
    } catch (e) {
      logger.debug('[api-login] error : ', e)
      next(e)
    }
  }

  async update(req, res) {
    //   try {
    //     const validationErrors = validationResult(req)
    //     if (!validationErrors.isEmpty()) {
    //       return res.status(400).json({
    //         message: 'Registration error',
    //         validationErrors,
    //       })
    //     }
    //     const { username, password = '' } = req.body
    //     let avatar = null
    //     const objChanges = { username }
    //     // my Validatation password
    //     if (password.length >= 8 && password.length <= 32) {
    //       objChanges['password'] = bcrypt.hashSync(password, 7)
    //     } else {
    //       if (password !== '') {
    //         throw new Error('password is not correct')
    //       }
    //     }
    //     if (req.file) {
    //       const { mimetype, originalname, buffer } = req.file
    //       if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
    //         throw new Error('mimetype file is not correct')
    //       }
    //       const ext = originalname.split('.').pop()
    //       avatar = uuidv4() + '.' + ext
    //       fs.createWriteStream(`./storage/${avatar}`).write(buffer)
    //       objChanges['avatar'] = avatar
    //     }
    //     // user = await User.findByIdAndUpdate({ _id: req.jwtID }, objChanges)
    //     await User.findByIdAndUpdate({ _id: req.jwtID }, objChanges)
    //     return res.json({
    //       avatar: avatar,
    //     })
    //   } catch (e) {
    //     logger.debug('[api-update] error : ', e)
    //     return res.status(400).json({ message: 'Update error' })
    //   }
  }
}

export const authController = new AuthController()
