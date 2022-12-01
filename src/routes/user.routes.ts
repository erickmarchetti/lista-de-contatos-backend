import { Router } from "express"

import createUserController from "../controllers/user/createUser.controller"

import yupValidateMiddleware from "../middlewares/yupValidate.middleware"
import { createUserSchema } from "../schemas/createUser.schema"

const userRouter = Router()

userRouter.post(
  "",
  yupValidateMiddleware(createUserSchema),
  createUserController
)

export default userRouter
