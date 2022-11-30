import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./users.entities"

@Entity("user_numbers")
export class UserNumber {
  @PrimaryGeneratedColumn()
  readonly id: number

  @Column({ type: "varchar", length: 13 })
  number: string

  @ManyToOne(() => User, (user) => user.numbers)
  user: User
}
