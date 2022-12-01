import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { Contact } from "./contacts.entities"
import { v4 as uuid } from "uuid"

@Entity("contact_emails")
export class ContactEmail {
  @PrimaryColumn()
  readonly id: string = uuid()

  @Column({ type: "varchar", length: 40 })
  email: string

  @ManyToOne(() => Contact, (contact) => contact.emails, {
    onDelete: "CASCADE"
  })
  contact: Contact
}
