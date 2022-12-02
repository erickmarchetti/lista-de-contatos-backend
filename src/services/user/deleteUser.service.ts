import AppDataSource from "../../data-source"
import { User } from "../../entities/users.entities"

const deleteUserService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User)
  await userRepository.delete(userId)
}

export default deleteUserService
