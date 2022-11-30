import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm"
import { ContactEmail } from "./contact_emails.entities"
import { ContactNumber } from "./contact_numbers.entities"
import { User } from "./users.entities"

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ type: "varchar", length: 50 })
  full_name: string

  @ManyToOne(() => User, (user) => user.contacts)
  user: User

  @OneToMany(() => ContactEmail, (contactEmail) => contactEmail.contact)
  emails: ContactEmail[]

  @OneToMany(() => ContactNumber, (contactNumber) => contactNumber.contact)
  numbers: ContactNumber[]
}
