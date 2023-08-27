import { Router } from "express";
import { login, refresh, logut } from "@/controllers/authController";

const authRouter = Router();

authRouter.route("/login").post(login);
authRouter.route("/refresh").get(refresh);
authRouter.route("/logout").post(logut);

export default authRouter;
