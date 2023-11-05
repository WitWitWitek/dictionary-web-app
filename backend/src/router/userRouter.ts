import { Router } from "express";
import { getUserData, signUpNewUser } from "@/controllers/userController";
import { validateNewUserRoute } from "@/validators/userRoutesValidators";
import authMiddleware from "@/middleware/authMiddleware";

const userRouter = Router();
userRouter.route("/sign-up").post(validateNewUserRoute, signUpNewUser);
userRouter.route("/").get(authMiddleware, getUserData);
export default userRouter;
