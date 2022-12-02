import { instanceToPlain } from "class-transformer"
import { Request, Response } from "express"
import updateContactService from "../../services/contact/updateContact.service"

const updateContactController = async (req: Request, res: Response) => {
  const contact = await updateContactService({
    ...req.body,
    contactId: req.params.id
  })
  return res.status(200).json(instanceToPlain(contact))
}

export default updateContactController
