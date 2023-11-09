import { Router } from "express";
import { deleteUser, getUserData, signUpNewUser, updateUserPassword, verifyUser } from "@/controllers/userController";
import { validateNewUserRoute, validateUpdateUserPasswordRoute } from "@/validators/userRoutesValidators";
import authMiddleware from "@/middleware/authMiddleware";

const userRouter = Router();
userRouter.route("/sign-up").post(validateNewUserRoute, signUpNewUser);
userRouter.route("/change-password").patch(authMiddleware, validateUpdateUserPasswordRoute, updateUserPassword);
userRouter.route("/confirm/:emailToken").get(verifyUser);
userRouter.route("/").all(authMiddleware).get(getUserData).delete(deleteUser);
export default userRouter;
