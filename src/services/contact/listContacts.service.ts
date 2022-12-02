import AppDataSource from "../../data-source"
import { User } from "../../entities/users.entities"

const listContactsService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOne({
    where: { id: userId },
    relations: { contacts: true }
  })

  return user!.contacts
}

export default listContactsService
