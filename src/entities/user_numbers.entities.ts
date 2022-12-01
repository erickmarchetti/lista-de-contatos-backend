import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { User } from "./users.entities"
import { v4 as uuid } from "uuid"

@Entity("user_numbers")
export class UserNumber {
  @PrimaryColumn()
  readonly id: string = uuid()

  @Column({ type: "varchar", length: 13 })
  number: string

  @ManyToOne(() => User, (user) => user.numbers, { onDelete: "CASCADE" })
  user: User
}
