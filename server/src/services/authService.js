import { userModel } from '../models/User.js'
import bcrypt from 'bcrypt'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { mailService } from './mailService.js'
import { tokenService } from './tokenService.js'
import { AuthUserDTO } from '../api/dto/authUserDTO.js'
import { ApiError } from '../exceptions/apiError.js'
import { fileServices } from './fileServices.js'
import { DataUserDTO } from '../api/dto/dataUserDTO.js'
// import { logger } from '../../utils/logger.js'

class AuthService {
  async registration({ username, email, password, gender, birthday, file }) {
    const candidate = await userModel.findOne({ email })
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists!`)
    }

    let avatar = null
    if (file) {
      const { mimetype, originalname, buffer } = file
      if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
        throw ApiError.BadRequest(`Mimetype file is not correct`)
      }

      const ext = originalname.split('.').pop()
      avatar = uuidv4() + '.' + ext
      fileServices.saveFile(
        path.join(path.resolve(), process.env.STATIC_FOLDER_NAME, avatar),
        buffer
      )
    }
    const hashPassword = await bcrypt.hash(password, 7)
    const activationLink = uuidv4()
    const user = await userModel.create({
      username,
      email,
      gender,
      birthday,
      avatar,
      password: hashPassword,
      activationLink,
    })
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    )
    const userDTO = new AuthUserDTO(user)
    return userDTO
  }

  async activate(activationLink) {
    const user = await userModel.findOne({ activationLink })
    if (!user) {
      throw ApiError.BadRequest('Incorrect activation link')
    }
    user.isActivated = true
    await user.save()
  }

  async login(email, password) {
    const user = await userModel.findOne({ email })
    if (!user) {
      throw ApiError.BadRequest(`User with email ${email} not exists!`)
    }
    const isPasswordsEquals = await bcrypt.compare(password, user.password)
    if (!isPasswordsEquals) {
      throw ApiError.BadRequest(`Uncorrect password!`)
    }
    const userDTO = new AuthUserDTO(user)
    const tokens = await tokenService.generateTokens({ ...userDTO })
    await tokenService.saveToken(user._id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDTO,
    }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userToken = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userToken || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }

    const user = await userModel.findById(userToken.id) // for update tokenInfo
    const authUserDTO = new AuthUserDTO(user) // id, email, isActivated
    const tokens = await tokenService.generateTokens({ ...authUserDTO })
    await tokenService.saveToken(user._id, tokens.refreshToken)
    return {
      ...tokens,
      user: authUserDTO,
    }
  }

  async getOtherUsers(currentUserId) {
    const users = await userModel.find({
      _id: { $ne: currentUserId },
      isActivated: true,
    })
    const usersDTO = users.map((user) => new DataUserDTO(user))
    return usersDTO
  }

  async update({ userId, username, password = '', avatar = null }) {
    const user = await userModel.findById(userId)
    let newAvatar = null
    user.username = username
    // my Validatation password
    if (password.length >= 8 && password.length <= 32) {
      user['password'] = bcrypt.hashSync(password, 7)
    } else {
      if (password !== '') {
        throw ApiError.BadRequest(`Uncorrect password!`)
      }
    }

    if (avatar) {
      const { mimetype, originalname, buffer } = avatar
      if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
        throw ApiError.BadRequest(`Mimetype file is not correct`)
      }
      const ext = originalname.split('.').pop()
      newAvatar = uuidv4() + '.' + ext

      if (user.avatar) {
        fileServices.deleteFile(
          path.join(path.resolve(), process.env.STATIC_FOLDER_NAME, user.avatar)
        )
      }

      fileServices.saveFile(
        path.join(path.resolve(), process.env.STATIC_FOLDER_NAME, newAvatar),
        buffer
      )
      user['avatar'] = newAvatar
    }
    user.save()
    return new AuthUserDTO(user)
  }

  async profile(currentUserId) {
    const user = await userModel.findById(currentUserId)
    return new AuthUserDTO(user)
  }
}

export const authService = new AuthService()
