import AppDataSource from "../../data-source"
import { AppError } from "../../errors/appErrors"
import { User } from "../../entities/users.entities"
import { LoginRequest } from "../../interfaces"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import "dotenv/config"

const userLoginService = async ({ full_name, password }: LoginRequest) => {
  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository.findOneBy({ full_name })

  if (!user) {
    throw new AppError(401, "full_name or password are wrong")
  }

  const comparePassword = bcrypt.compareSync(password, user.password)

  if (!comparePassword) {
    throw new AppError(401, "full_name or password are wrong.")
  }

  const token = jwt.sign(
    {
      userId: user.id
    },
    process.env.SECRET_KEY as string,
    { expiresIn: "24h" }
  )

  return { id: user.id, token }
}

export default userLoginService
