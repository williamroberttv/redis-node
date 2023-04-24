import { Request, Response, Router } from "express";
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

usersRouter.post("/", async function (req: Request, res: Response) {
  const data = req.body;
  const user = await userService.createUser(data);
  res.json(user);
});

export { usersRouter };
