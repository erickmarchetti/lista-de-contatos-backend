import AppDataSource from "../../data-source"
import { User } from "../../entities/users.entities"

const readUserService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User)

  return await userRepository.findOne({
    where: { id: userId },
    relations: { emails: true, numbers: true }
  })
}

export default readUserService
