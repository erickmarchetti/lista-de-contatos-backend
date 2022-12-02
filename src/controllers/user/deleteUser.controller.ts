import { Request, Response } from "express"
import deleteUserService from "../../services/user/deleteUser.service"

const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(req.params.id)
  return res.status(204).json()
}

export default deleteUserController
