import { Router } from "express";
import { login, refresh, logut } from "@/controllers/authController";
import { validateLoginRoute, validateRefreshRoute } from "@/validators/authRoutesValidators";

const authRouter = Router();

authRouter.route("/login").post(validateLoginRoute, login);
authRouter.route("/refresh").get(validateRefreshRoute, refresh);
authRouter.route("/logout").post(logut);

export default authRouter;
