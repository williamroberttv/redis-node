import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

// @Entity({ name: "user_messages" })
// export class UserMessage {
//   @PrimaryGeneratedColumn("uuid")
//   id: number;

//   @Column({ name: "message", nullable: true })
//   message?: string;

//   // @RelationId((message: UserMessage) => message.user)
//   @Column({ name: "user_id", nullable: false })
//   userId: string;

//   @Column({ name: "created_at", nullable: true })
//   createdAt?: Date;

//   @Column({ name: "updated_at", nullable: true })
//   updatedAt?: Date;

//   @Column({ name: "deleted_at", nullable: true })
//   deletedAt?: Date;

//   @ManyToOne((type) => User)
//   user: User;
// }
@Entity({ name: "user_messages" })
export class UserMessage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  message: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date;

  @Column({ name: "user_id" })
  userId: string;
}
