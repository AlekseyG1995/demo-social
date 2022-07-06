// import { logger } from '../../utils/logger.js'

import { userModel } from '../models/User.js'
import bcrypt from 'bcrypt'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { mailService } from './mailService.js'
import { tokenService } from './tokenService.js'
import { AuthUserDTO } from '../api/dto/authUserDTO.js'
import { ApiError } from '../exceptions/apiError.js'
import { fileServices } from './fileServices.js'

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
    const isPasswordsEquals = bcrypt.compare(password, user.password)
    if (await !isPasswordsEquals) {
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
    const userDTO = new UserDTO(user) // id, email, isActivated
    const tokens = await tokenService.generateTokens({ ...userDTO })
    await tokenService.saveToken(user._id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDTO,
    }
  }

  async getAllUsers() {
    // need Other
    const users = await userModel.find()
    return users
  }
}

export const authService = new AuthService()
