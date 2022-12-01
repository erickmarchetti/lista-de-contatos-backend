import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm"
import { ContactEmail } from "./contact_emails.entities"
import { ContactNumber } from "./contact_numbers.entities"
import { User } from "./users.entities"
import { v4 as uuid } from "uuid"

@Entity("contacts")
export class Contact {
  @PrimaryColumn()
  readonly id: string = uuid()

  @Column({ type: "varchar", length: 50 })
  full_name: string

  @ManyToOne(() => User, (user) => user.contacts, { onDelete: "CASCADE" })
  user: User

  @OneToMany(() => ContactEmail, (contactEmail) => contactEmail.contact)
  emails: ContactEmail[]

  @OneToMany(() => ContactNumber, (contactNumber) => contactNumber.contact)
  numbers: ContactNumber[]
}
