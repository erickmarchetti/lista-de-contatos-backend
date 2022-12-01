import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./users.entities"

@Entity("user_emails")
export class UserEmail {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ type: "varchar", length: 40 })
  email: string

  @ManyToOne(() => User, (user) => user.emails, { onDelete: "CASCADE" })
  user: User
}
