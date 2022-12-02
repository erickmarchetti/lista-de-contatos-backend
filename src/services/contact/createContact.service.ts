import AppDataSource from "../../data-source"
import { ContactCreateRequest } from "../../interfaces"
import { Contact } from "../../entities/contacts.entities"
import { ContactEmail } from "../../entities/contact_emails.entities"
import { ContactNumber } from "../../entities/contact_numbers.entities"
import { User } from "../../entities/users.entities"

const createContactService = async ({
  userId,
  full_name,
  emails,
  numbers
}: ContactCreateRequest) => {
  const userRepository = AppDataSource.getRepository(User)
  const contactRepository = AppDataSource.getRepository(Contact)
  const emailRepository = AppDataSource.getRepository(ContactEmail)
  const numberRepository = AppDataSource.getRepository(ContactNumber)

  const user = await userRepository.findOne({ where: { id: userId } })

  const newContact = contactRepository.create({
    full_name,
    user: user!
  })

  await contactRepository.save(newContact)

  await emailRepository.save(
    emails.map((email) =>
      emailRepository.create({ email, contact: newContact })
    )
  )
  await numberRepository.save(
    numbers.map((number) =>
      numberRepository.create({ number, contact: newContact })
    )
  )

  return await contactRepository.findOne({
    where: { id: newContact.id },
    relations: { emails: true, numbers: true, user: true }
  })
}

export default createContactService
