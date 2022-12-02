import { Router } from "express"

import createContactController from "../controllers/contact/createContact.controller"
import listContactsController from "../controllers/contact/listContacts.controller"
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
contactRouter.get("", verifyTokenMiddleware, listContactsController)

export default contactRouter
