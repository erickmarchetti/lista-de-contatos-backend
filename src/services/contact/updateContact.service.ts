import AppDataSource from "../../data-source"
import { ContactUpdateRequest } from "../../interfaces"
import { ContactEmail } from "../../entities/contact_emails.entities"
import { ContactNumber } from "../../entities/contact_numbers.entities"
import { Contact } from "../../entities/contacts.entities"

const updateContactService = async ({
  contactId,
  full_name,
  emails,
  numbers
}: ContactUpdateRequest) => {
  const contactRepository = AppDataSource.getRepository(Contact)
  const emailRepository = AppDataSource.getRepository(ContactEmail)
  const numberRepository = AppDataSource.getRepository(ContactNumber)

  const contact = await contactRepository.findOne({
    where: { id: contactId },
    relations: { emails: true, numbers: true }
  })

  if (emails) {
    const idList = contact!.emails.map((email) => email.id)

    idList.length > 0 && (await emailRepository.delete(idList))

    await emailRepository.save(
      emails.map((email) =>
        emailRepository.create({ email, contact: contact! })
      )
    )
  }

  if (numbers) {
    const idList = contact!.numbers.map((number) => number.id)

    idList.length > 0 && (await numberRepository.delete(idList))

    await numberRepository.save(
      numbers.map((number) =>
        numberRepository.create({ number, contact: contact! })
      )
    )
  }

  if (full_name) {
    await contactRepository.update(contactId, {
      full_name: full_name
    })
  }

  return await contactRepository.findOne({
    where: { id: contactId },
    relations: { emails: true, numbers: true, user: true }
  })
}

export default updateContactService
