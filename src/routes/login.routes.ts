import { Router } from "express"

import userLoginController from "../controllers/login/userLogin.controller"

import yupValidateMiddleware from "../middlewares/yupValidate.middleware"
import { userLoginSchema } from "../schemas/userLogin.schema"

const loginRouter = Router()

loginRouter.post(
  "",
  yupValidateMiddleware(userLoginSchema),
  userLoginController
)

export default loginRouter
