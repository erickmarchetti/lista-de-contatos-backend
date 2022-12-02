import { Router } from "express"

import createContactController from "../controllers/contact/createContact.controller"
import deleteContactController from "../controllers/contact/deleteContact.controller"
import listContactsController from "../controllers/contact/listContacts.controller"
import checkContactValidityMiddleware from "../middlewares/checkContactValidity.middleware"
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
contactRouter.delete(
  "/:id",
  verifyTokenMiddleware,
  checkContactValidityMiddleware,
  deleteContactController
)

export default contactRouter
