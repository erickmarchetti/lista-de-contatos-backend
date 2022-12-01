import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { Contact } from "./contacts.entities"
import { v4 as uuid } from "uuid"

@Entity("contact_numbers")
export class ContactNumber {
  @PrimaryColumn()
  readonly id: string = uuid()

  @Column({ type: "varchar", length: 13 })
  number: string

  @ManyToOne(() => Contact, (contact) => contact.numbers, {
    onDelete: "CASCADE"
  })
  contact: Contact
}
