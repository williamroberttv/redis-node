import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ name: "first_name", nullable: true })
  firstName?: string;

  @Column({ name: "last_name", nullable: true })
  lastName?: string;

  @Column({ name: "age", nullable: true })
  age?: number;

  @Column({ name: "password", nullable: true })
  password?: string;

  @Column({ name: "email", nullable: true })
  email?: string;

  @Column({ name: "created_at", nullable: true })
  createdAt?: Date;

  @Column({ name: "updated_at", nullable: true })
  updatedAt?: Date;

  @Column({ name: "deleted_at", nullable: true })
  deletedAt?: Date;

  // @OneToMany((type) => UserMessage, (message) => message.user)
  // messages: UserMessage[];
}
