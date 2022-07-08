import { validationResult } from 'express-validator'
import { logger } from '../utils/logger.js'
import { ApiError } from '../exceptions/apiError.js'
import { authService } from '../services/authService.js'

class AuthController {
  async profile(req, res, next) {
    try {
      const currentUserId = req.user.id
      const user = await authService.profile(currentUserId)
      return res.json(user)
    } catch (e) {
      logger.warning('[authController] profile error ', e)
      next(e)
    }
  }

  async users(req, res, next) {
    try {
      const currentUserId = req.user.id
      const users = await authService.getOtherUsers(currentUserId)
      return res.json(users)
    } catch (e) {
      next(e)
    }
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
      const user = await authService.registration({
        username,
        email,
        password,
        gender,
        birthday,
        file: req.file,
      })
      logger.info('[api-registration] registration successful! id:', user.id)
      return res.status(200).json({ message: 'registration successful', user })
    } catch (e) {
      logger.warning('[api-registration] error : ', e)
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
      logger.info('[api-login] login successful! id: ', user.id)
      return res.json({ user, accessToken })
    } catch (e) {
      logger.warning('[api-login] error : ', e)
      next(e)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      await authService.activate(activationLink)
      return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const token = await authService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken: oldRefreshToken } = req.cookies
      const { user, accessToken, refreshToken } = await authService.refresh(
        oldRefreshToken
      )
      res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json({ user, accessToken })
    } catch (e) {
      next(e)
    }
  }

  async update(req, res, next) {
    try {
      const errorsValidator = validationResult(req)
      if (!errorsValidator.isEmpty()) {
        return next(
          ApiError.BadRequest('Validation Error', errorsValidator.array())
        )
      }
      const user = await authService.update({
        userId: req.user.id,
        username: req.body.username,
        password: req.body.password,
        avatar: req.file,
      })
      logger.info('[api-updata] update successful: ', user.email)
      return res.json({ user })
    } catch (e) {
      next(e)
    }
  }
}

export const authController = new AuthController()
