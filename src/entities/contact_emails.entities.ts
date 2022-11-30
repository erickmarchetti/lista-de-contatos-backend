import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Contact } from "./contacts.entities"

@Entity("contact_emails")
export class ContactEmail {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ type: "varchar", length: 40 })
  email: string

  @ManyToOne(() => Contact, (contact) => contact.emails)
  contact: Contact
}
