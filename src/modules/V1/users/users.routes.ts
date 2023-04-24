import { validate } from "class-validator";
import { NextFunction, Request, Response, Router } from "express";
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
    const data = req.body;

    const errors = await validate(data);
    console.log(errors);
    if (errors.length) {
      next(new Error());
    }

    const user = await userService.createUser(data);
    res.json(user);
  }
);

export { usersRouter };
