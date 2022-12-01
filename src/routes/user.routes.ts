import { Router } from "express"

import createUserController from "../controllers/user/createUser.controller"
import { nameAlreadyExistsMiddleware } from "../middlewares/nameAlreadyExists.middleware"

import yupValidateMiddleware from "../middlewares/yupValidate.middleware"
import { createUserSchema } from "../schemas/createUser.schema"

const userRouter = Router()

userRouter.post(
  "",
  yupValidateMiddleware(createUserSchema),
  nameAlreadyExistsMiddleware,
  createUserController
)

export default userRouter
