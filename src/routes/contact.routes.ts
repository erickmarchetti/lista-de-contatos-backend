import { Router } from "express"

import createContactController from "../controllers/contact/createContact.controller"
import deleteContactController from "../controllers/contact/deleteContact.controller"
import listContactsController from "../controllers/contact/listContacts.controller"
import updateContactController from "../controllers/contact/updateContact.controller"
import checkContactValidityMiddleware from "../middlewares/checkContactValidity.middleware"
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware"

import yupValidateMiddleware from "../middlewares/yupValidate.middleware"
import { createContactSchema } from "../schemas/createContact.schema"
import { updateContactSchema } from "../schemas/updateContact.schema"

const contactRouter = Router()

contactRouter.post(
  "",
  verifyTokenMiddleware,
  yupValidateMiddleware(createContactSchema),
  createContactController
)
contactRouter.get("", verifyTokenMiddleware, listContactsController)
contactRouter.patch(
  "/:id",
  verifyTokenMiddleware,
  yupValidateMiddleware(updateContactSchema),
  checkContactValidityMiddleware,
  updateContactController
)
contactRouter.delete(
  "/:id",
  verifyTokenMiddleware,
  checkContactValidityMiddleware,
  deleteContactController
)

export default contactRouter
