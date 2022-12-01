import AppDataSource from "../../data-source"
import { User } from "../../entities/users.entities"
import { UserCreateRequest } from "../../interfaces"
import { hashSync } from "bcryptjs"
import { UserEmail } from "../../entities/user_emails.entities"
import { UserNumber } from "../../entities/user_numbers.entities"

const createUserService = async ({
  full_name,
  password,
  emails,
  numbers
}: UserCreateRequest) => {
  const userRepository = AppDataSource.getRepository(User)
  const emailRepository = AppDataSource.getRepository(UserEmail)
  const numberRepository = AppDataSource.getRepository(UserNumber)

  const hashedPassword = hashSync(password, 10)

  const newUser = await userRepository.save({
    full_name,
    password: hashedPassword
  })

  await emailRepository.insert(
    emails.map((email) => ({ email, user: newUser }))
  )
  await numberRepository.insert(
    numbers.map((number) => ({ number, user: newUser }))
  )

  return await userRepository
    .find({
      where: { id: newUser.id },
      relations: { emails: true, numbers: true }
    })
    .then((res) => res[0])
}

export default createUserService
