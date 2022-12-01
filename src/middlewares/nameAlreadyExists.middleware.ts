import { Request, Response, NextFunction } from "express"
import AppDataSource from "../data-source"
import { User } from "../entities/users.entities"
import { AppError } from "../errors/appErrors"

const nameAlreadyExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User)

  const { full_name } = request.body

  const userExists = await userRepository.findOneBy({ full_name })

  if (userExists) {
    throw new AppError(400, "Name already registered")
  }

  return next()
}

export default nameAlreadyExistsMiddleware
