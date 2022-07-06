import { Router } from 'express'
import { check } from 'express-validator'
import multer from 'multer'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { authController } from './authController.js'
export const router = new Router()

const middlewares = {
  data: authMiddleware,
  profile: authMiddleware,
  account: [
    multer({ limits: { fileSize: 5242880 } }).single('file'), // 5MB file limit
    check('username', 'Username cannot be empty ').trim().notEmpty(),
    authMiddleware,
  ],
  registration: [
    multer({ limits: { fileSize: 5242880 } }).single('file'), // 5MB file limit
    check('username', 'Username cannot be empty ').trim().notEmpty(),
    check(
      'password',
      'Password must be more than 8 and less than 32 characters'
    ).isLength({ min: 8, max: 32 }),
    check('email', 'Email is not valid').isEmail(),
    check('gender', 'Gender Error').isIn(['male', 'female']),
    check('birthday', 'Date is not valid').isDate(),
  ],
  login: [
    multer().none(),
    check('email', 'Email is not valid').isEmail(),
    check(
      'password',
      'Password must be more than 8 and less than 32 characters'
    ).isLength({ min: 8, max: 32 }),
  ],
}

router.post(
  '/registration',
  middlewares['registration'],
  authController.registration
)
router.get('/activate/:link', authController.activate)
router.post('/login', middlewares['login'], authController.login)
router.get('/data', middlewares['data'], authController.people)
router.get('/profile', middlewares['profile'], authController.profile)
// router.put('/account', middlewares['account'], authController.update)
router.post('/logout', authController.logout)
router.get('/refresh', authController.refresh)
