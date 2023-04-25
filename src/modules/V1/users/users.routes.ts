import { validate } from "class-validator";
import { NextFunction, Request, Response, Router } from "express";
import { UserDto } from "./users.dto";
import { UserService } from "./users.service";

const usersRouter = Router();
const userService = new UserService();

usersRouter.get("/", async function (_, res: Response) {
  const users = await userService.getUsers();
  res.json({ users: users });
});

usersRouter.get("/redis", async function (_, res: Response) {
  const users = await userService.getUsersByRedis();
  res.json({ users: users });
});

usersRouter.post(
  "/",
  async function (req: Request, res: Response, next: NextFunction) {
    const userData = new UserDto();
    userData.email = req.body.email;
    userData.password = req.body.password;
    userData.firstName = req.body.firstName;
    userData.lastName = req.body.lastName;
    userData.age = req.body.age;

    const errors = await validate(userData);
    if (errors.length) {
      console.log(errors);
      return;
    }

    const user = await userService.createUser(userData);
    res.json(user);
  }
);

export { usersRouter };
