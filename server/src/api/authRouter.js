// import express from "express"
// import bodyParser from "body-parser"

import { Router } from "express"
import { check } from "express-validator"
import multer from "multer"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { authController } from "./authController.js"
export const router = new Router()

const middlewares = {
  "get:/data": authMiddleware,
  "get:/profile": authMiddleware,
  "put:/account": [
    multer({ limits: { fileSize: 5242880 } }).single("file"), // 5MB file limit
    check("username", "Username cannot be empty ").trim().notEmpty(),
    authMiddleware,
  ],
  "post:/registration": [
    multer({ limits: { fileSize: 5242880 } }).single("file"), // 5MB file limit
    check("username", "Username cannot be empty ").trim().notEmpty(),
    check("password", "Password must be more than 8 and less than 32 characters").isLength({ min: 8, max: 32 }),
    check("email", "Email is not valid").isEmail(),
    check("gender", "Gender Error").isIn(["male", "female"]),
    check("birthday", "Date is not valid").isDate(),
  ],
  "post:/login": multer().none(),
}

router.get("/data", middlewares["get:/data"], authController.getPrivateInfo)
router.get("/profile", middlewares["get:/profile"], authController.profile)
router.put("/account", middlewares["put:/account"], authController.update)
router.post("/registration", middlewares["post:/registration"], authController.registration)
router.post("/login", middlewares["post:/login"], authController.login)
