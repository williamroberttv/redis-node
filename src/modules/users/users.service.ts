import { AppDataSource as db } from "../../data-source";
import { User } from "../../entity/User";
import { client } from "../../redis/config";
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

  async createUser(data: any): Promise<IUser[]> {
    try {
      const user = await db
        .getRepository(User)
        .find({ where: { email: data.email } });

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
