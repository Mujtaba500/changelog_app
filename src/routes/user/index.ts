import { Router } from "express";
import userController from "../../controllers/user";

const authRouter = Router();

authRouter.post("/signup", userController.createUser);

authRouter.post("/login", userController.login);

export default authRouter;
