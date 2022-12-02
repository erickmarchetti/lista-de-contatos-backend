import { instanceToPlain } from "class-transformer"
import { Request, Response } from "express"
import listContactsService from "../../services/contact/listContacts.service"

const listContactsController = async (req: Request, res: Response) => {
  const contact = await listContactsService(req.userId)
  return res.status(200).json(instanceToPlain(contact))
}

export default listContactsController
