import bcrypt from "bcrypt";
import { AppDataSource as db } from "../../../database/data-source";
import { User } from "../../../database/entity/User";
import { UserMessage } from "../../../database/entity/UserMessage";
import { client } from "../../../database/redis/config";
import { IUser } from "../../../shared/interfaces";
import { MessageDto } from "./message.dto";
import { UserDto } from "./users.dto";
export class UserService {
  constructor() {}
  async getUsers() {
    try {
      const users = await db.getRepository(User).find();
      return users;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async getUsersByRedis(): Promise<IUser[]> {
    try {
      let users: IUser[];
      const cachedUsers = await client.get("users");
      console.log(cachedUsers);

      if (!cachedUsers) {
        users = await db.getRepository(User).find();
        client.set("users", JSON.stringify(users));
        client.expire("users", 60 * 60 * 24);
      } else {
        users = JSON.parse(cachedUsers);
      }

      return users;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async createUser(data: UserDto): Promise<IUser> {
    try {
      const user = await db
        .getRepository(User)
        .findOne({ where: { email: data.email } });

      if (user?.email) {
        const message = "Email já cadastrado no sistema.";
        throw new Error(message);
      }

      const encryptedPass = bcrypt.hashSync(data.password, 10);

      data.password = encryptedPass;

      const newUser = await db.getRepository(User).save(data);

      return newUser;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async createUserMessage(data: MessageDto): Promise<void> {
    try {
      const message = await db.getRepository(UserMessage).save(data);
      console.log(`Fila registrou a mensagem:` + message);
    } catch (error) {
      console.error(error);
    }
  }
}
