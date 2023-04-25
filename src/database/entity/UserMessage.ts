import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "user_message" })
export class UserMessage {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ name: "message", nullable: true })
  message?: string;

  @RelationId((message: UserMessage) => message.user)
  categoryId: number;
  @Column()
  userId: number;

  @Column({ name: "created_at", nullable: true })
  createdAt?: Date;

  @Column({ name: "updated_at", nullable: true })
  updatedAt?: Date;

  @Column({ name: "deleted_at", nullable: true })
  deletedAt?: Date;

  @ManyToOne((type) => User)
  user: User;
}
