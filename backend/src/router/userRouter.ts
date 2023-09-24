import { Router } from "express";
import { signUpNewUser } from "@/controllers/userController";
import { validateNewUserRoute } from "@/validators/userRoutesValidators";

const userRouter = Router();

userRouter.route("/sign-up").post(validateNewUserRoute, signUpNewUser);

export default userRouter;
