import { AppDataSource as db } from "../../../database/data-source";
import { User } from "../../../database/entity/User";
import { client } from "../../../database/redis/config";
import { IUser } from "../../../shared/interfaces";
import { UserDto } from "./users.dto";
export class UserService {
  constructor() {}
  async getUsers() {
    try {
      const users = await db.getRepository(User).find();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUsersByRedis(): Promise<IUser[]> {
    try {
      let users: IUser[];
      const cachedUsers = await client.get("users");

      if (!cachedUsers) {
        users = await db.getRepository(User).find();
        client.set("users", JSON.stringify(users));
      } else {
        users = JSON.parse(cachedUsers);
      }

      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(data: UserDto): Promise<IUser> {
    try {
      const user = await db
        .getRepository(User)
        .findOne({ where: { email: data.email } });

      if (user) {
        const message = "Email já cadastrado no sistema.";
        throw new Error(message);
      }

      // const encryptedPass =

      const newUser = await db.getRepository(User).save(data);

      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}
