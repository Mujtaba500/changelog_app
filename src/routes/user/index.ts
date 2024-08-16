import { Router } from "express";
import userController from "../../controllers/user";
import authValidator from "../../validators/auth";

const authRouter = Router();

authRouter.post("/signup", authValidator.signup, userController.createUser);

authRouter.post("/login", authValidator.login, userController.login);

export default authRouter;
