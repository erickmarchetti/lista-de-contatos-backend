import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Contact } from "./contacts.entities"

@Entity("contact_numbers")
export class ContactNumber {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ type: "varchar", length: 13 })
  number: string

  @ManyToOne(() => Contact, (contact) => contact.numbers)
  contact: Contact
}
