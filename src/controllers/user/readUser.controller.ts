import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"
import readUserService from "../../services/user/readUser.service"

const readUserController = async (req: Request, res: Response) => {
  const user = await readUserService(req.params.id)
  return res.status(200).json(instanceToPlain(user))
}

export default readUserController
