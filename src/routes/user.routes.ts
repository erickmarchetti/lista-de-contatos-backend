import { Router } from "express"

import createUserController from "../controllers/user/createUser.controller"
import deleteUserController from "../controllers/user/deleteUser.controller"
import readUserController from "../controllers/user/readUser.controller"
import updateUserController from "../controllers/user/updateUser.controller"
import checkUserValidityMiddleware from "../middlewares/checkUserValidity.middleware"
import nameAlreadyExistsMiddleware from "../middlewares/nameAlreadyExists.middleware"
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"

import yupValidateMiddleware from "../middlewares/yupValidate.middleware"
import { createUserSchema } from "../schemas/createUser.schema"
import { updateUserSchema } from "../schemas/updateUser.schema"

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
userRouter.patch(
  "/:id/",
  verifyTokenMiddleware,
  yupValidateMiddleware(updateUserSchema),
  checkUserValidityMiddleware,
  updateUserController
)
userRouter.delete(
  "/:id/",
  verifyTokenMiddleware,
  checkUserValidityMiddleware,
  deleteUserController
)

export default userRouter
