import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/appErrors"
import { validate } from "uuid"
import "dotenv/config"
import AppDataSource from "../data-source"
import { User } from "../entities/users.entities"

const checkUserValidityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!validate(req.params.id)) {
    throw new AppError(400, `${req.params.id} isn't a valid uuid`)
  }

  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository.findOneBy({ id: req.params.id })

  if (!user) {
    throw new AppError(404, "User not found")
  }

  if (req.params.id !== req.userId) {
    throw new AppError(401, "A user cannot interfere with another")
  }

  return next()
}

export default checkUserValidityMiddleware
