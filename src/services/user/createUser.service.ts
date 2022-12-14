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

  const newUser = userRepository.create({
    full_name,
    password: hashedPassword
  })

  await userRepository.save(newUser)

  await emailRepository.save(
    emails.map((email) => emailRepository.create({ email, user: newUser }))
  )
  await numberRepository.save(
    numbers.map((number) => numberRepository.create({ number, user: newUser }))
  )

  return await userRepository.findOne({
    where: { id: newUser.id },
    relations: { emails: true, numbers: true }
  })
}

export default createUserService
