import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/appErrors"
import { validate } from "uuid"
import AppDataSource from "../data-source"
import { Contact } from "../entities/contacts.entities"

const checkContactValidityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!validate(req.params.id)) {
    throw new AppError(400, `${req.params.id} isn't a valid uuid`)
  }

  const contactRepository = AppDataSource.getRepository(Contact)
  const contact = await contactRepository.findOne({
    where: { id: req.params.id },
    relations: { user: true }
  })

  if (!contact) {
    throw new AppError(404, "Contact not found")
  }

  if (contact.user.id !== req.userId) {
    throw new AppError(
      401,
      "A user must not interfere with another user's contact"
    )
  }

  return next()
}

export default checkContactValidityMiddleware
