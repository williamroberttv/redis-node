import { client } from "../..";
import { AppDataSource as db } from "../../data-source";
import { User } from "../../entity/User";
import { IUser } from "../../shared/interfaces";
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

  async getUsersByRedis() {
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
}
