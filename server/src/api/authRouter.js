// import express from "express"
// import bodyParser from "body-parser"

import { Router } from "express"
import { check } from "express-validator"
import multer from "multer"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { authController } from "./authController.js"
export const router = new Router()

router.get("/data", authMiddleware, authController.getPrivateInfo)
router.get("/profile", authMiddleware, authController.profile)

router.put(
  "/account",
  [
    multer({ limits: { fileSize: 5242880 } }).single("file"), // 5MB file limit
    check("username", "Username cannot be empty ").trim().notEmpty(),
    // check("password", "Password must be more than 8 and less than 32 characters").isLength({ min: 8, max: 32 }),
  ],
  authMiddleware,
  authController.update
)

router.post(
  "/registration",
  [
    multer({ limits: { fileSize: 5242880 } }).single("file"), // 5MB file limit
    check("username", "Username cannot be empty ").trim().notEmpty(),
    check("password", "Password must be more than 8 and less than 32 characters").isLength({ min: 8, max: 32 }),
    check("email", "Email is not valid").isEmail(),
    check("gender", "Gender Error").isIn(["male", "female"]),
    check("birthday", "Date is not valid").isDate(),
  ],
  authController.registration
)

router.post("/login", multer().none(), authController.login)
