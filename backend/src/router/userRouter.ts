import { Router } from "express";
import { deleteUser, getUserData, signUpNewUser } from "@/controllers/userController";
import { validateNewUserRoute } from "@/validators/userRoutesValidators";
import authMiddleware from "@/middleware/authMiddleware";

const userRouter = Router();
userRouter.route("/sign-up").post(validateNewUserRoute, signUpNewUser);
userRouter.route("/").all(authMiddleware).get(getUserData).delete(deleteUser);
export default userRouter;
