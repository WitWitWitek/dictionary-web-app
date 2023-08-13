import { Router } from "express";
import { signUpNewUser } from "../controllers/userController";

const userRouter = Router();

userRouter.route("/sign-up").post(signUpNewUser);

export default userRouter;
