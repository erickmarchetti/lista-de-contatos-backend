import { Request, Response } from "express"
import deleteContactService from "../../services/contact/deleteContact.service"

const deleteContactController = async (req: Request, res: Response) => {
  await deleteContactService(req.params.id)
  return res.status(204).json()
}

export default deleteContactController
