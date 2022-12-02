import { Router } from "express"

import createContactController from "../controllers/contact/createContact.controller"
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"

import yupValidateMiddleware from "../middlewares/yupValidate.middleware"
import { createContactSchema } from "../schemas/createContact.schema"

const contactRouter = Router()

contactRouter.post(
  "",
  verifyTokenMiddleware,
  yupValidateMiddleware(createContactSchema),
  createContactController
)

export default contactRouter
