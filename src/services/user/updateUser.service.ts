import AppDataSource from "../../data-source"
import { User } from "../../entities/users.entities"
import { UserCreateRequest, UserUpdateRequest } from "../../interfaces"
import { hashSync } from "bcryptjs"
import { UserEmail } from "../../entities/user_emails.entities"
import { UserNumber } from "../../entities/user_numbers.entities"

const updateUserService = async ({
  userId,
  full_name,
  password,
  emails,
  numbers
}: UserUpdateRequest) => {
  const userRepository = AppDataSource.getRepository(User)
  const emailRepository = AppDataSource.getRepository(UserEmail)
  const numberRepository = AppDataSource.getRepository(UserNumber)

  const user = await userRepository.findOne({
    where: { id: userId },
    relations: { emails: true, numbers: true }
  })

  if (emails) {
    const idList = user!.emails.map((email) => email.id)

    idList.length > 0 && (await emailRepository.delete(idList))

    await emailRepository.save(
      emails.map((email) => emailRepository.create({ email, user: user! }))
    )
  }

  if (numbers) {
    const idList = user!.numbers.map((number) => number.id)

    idList.length > 0 && (await numberRepository.delete(idList))

    await numberRepository.save(
      numbers.map((number) => numberRepository.create({ number, user: user! }))
    )
  }

  const hashedPassword = password ? hashSync(password, 10) : undefined

  if (full_name || password) {
    await userRepository.update(userId, {
      full_name: full_name,
      password: hashedPassword
    })
  }

  return await userRepository
    .find({
      where: { id: userId },
      relations: { emails: true, numbers: true }
    })
    .then((res) => res[0])
}

export default updateUserService
