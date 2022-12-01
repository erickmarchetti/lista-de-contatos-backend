import { Router } from "express"

import createUserController from "../controllers/user/createUser.controller"
import readUserController from "../controllers/user/readUser.controller"
import { nameAlreadyExistsMiddleware } from "../middlewares/nameAlreadyExists.middleware"
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"

import yupValidateMiddleware from "../middlewares/yupValidate.middleware"
import { createUserSchema } from "../schemas/createUser.schema"

const userRouter = Router()

userRouter.post(
  "",
  yupValidateMiddleware(createUserSchema),
  nameAlreadyExistsMiddleware,
  createUserController
)
userRouter.get("", verifyTokenMiddleware, readUserController)

export default userRouter
