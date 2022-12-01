import AppDataSource from "../../data-source"
import { User } from "../../entities/users.entities"

const readUserService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User)

  return await userRepository
    .find({
      where: { id: userId },
      relations: { emails: true, numbers: true }
    })
    .then((res) => res[0])
}

export default readUserService
