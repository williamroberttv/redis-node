import * as dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { UserMessage } from "./entity/UserMessage";

dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as any,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User, UserMessage],
  migrations: ["./src/database/migration/*.ts"],
  migrationsRun: true,
});
