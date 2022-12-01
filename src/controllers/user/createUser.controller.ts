import { Request, Response } from "express"
import createUserService from "../../services/user/createUser.service"
import { instanceToPlain } from "class-transformer"

const createUserController = async (req: Request, res: Response) => {
  const newUser = await createUserService(req.body)
  return res.status(201).json(instanceToPlain(newUser))
}

export default createUserController
