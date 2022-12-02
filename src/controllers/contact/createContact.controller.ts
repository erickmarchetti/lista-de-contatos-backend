import { instanceToPlain } from "class-transformer"
import { Request, Response } from "express"
import createContactService from "../../services/contact/createContact.service"

const createContactController = async (req: Request, res: Response) => {
  const newContact = await createContactService({
    ...req.body,
    userId: req.userId
  })
  return res.status(201).json(instanceToPlain(newContact))
}

export default createContactController
