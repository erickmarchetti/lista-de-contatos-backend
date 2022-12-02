import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"
import updateUserService from "../../services/user/updateUser.service"

const updateUserController = async (req: Request, res: Response) => {
  const user = await updateUserService({ ...req.body, userId: req.params.id })
  return res.status(200).json(instanceToPlain(user))
}

export default updateUserController
