import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { User } from "./users.entities"
import { v4 as uuid } from "uuid"

@Entity("user_emails")
export class UserEmail {
  @PrimaryColumn()
  readonly id: string = uuid()

  @Column({ type: "varchar", length: 40 })
  email: string

  @ManyToOne(() => User, (user) => user.emails, { onDelete: "CASCADE" })
  user: User
}
