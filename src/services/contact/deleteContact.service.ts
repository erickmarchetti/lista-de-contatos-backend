import AppDataSource from "../../data-source"
import { Contact } from "../../entities/contacts.entities"

const deleteContactService = async (contactId: string) => {
  const contactRepository = AppDataSource.getRepository(Contact)
  await contactRepository.delete(contactId)
}

export default deleteContactService
