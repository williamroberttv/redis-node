import { AppDataSource as db } from "../../data-source";
import { User } from "../../entity/User";
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

  // async getUsersByRedis() {
  //   try {
  //     const users = await db.getRepository(User).find();
  //     return users;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}
