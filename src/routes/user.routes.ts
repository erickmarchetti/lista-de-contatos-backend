import { Router } from "express"

import createUserController from "../controllers/user/createUser.controller"
import readUserController from "../controllers/user/readUser.controller"
import checkUserValidityMiddleware from "../middlewares/checkUserValidity.middleware"
import nameAlreadyExistsMiddleware from "../middlewares/nameAlreadyExists.middleware"
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
userRouter.get(
  "/:id/",
  verifyTokenMiddleware,
  checkUserValidityMiddleware,
  readUserController
)

export default userRouter
