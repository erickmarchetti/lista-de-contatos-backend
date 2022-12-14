import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn
} from "typeorm"
import { Exclude } from "class-transformer"
import { Contact } from "./contacts.entities"
import { UserEmail } from "./user_emails.entities"
import { UserNumber } from "./user_numbers.entities"
import { v4 as uuid } from "uuid"

@Entity("users")
export class User {
  @PrimaryColumn()
  readonly id: string = uuid()

  @Column({ type: "varchar", length: 50, unique: true })
  full_name: string

  @Exclude()
  @Column({ type: "varchar" })
  password: string

  @CreateDateColumn()
  readonly created_at: Date

  @OneToMany(() => UserEmail, (userEmail) => userEmail.user)
  emails: UserEmail[]

  @OneToMany(() => UserNumber, (userNumber) => userNumber.user)
  numbers: UserNumber[]

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[]
}
