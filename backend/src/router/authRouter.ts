import { Router } from "express";
import { login, refresh } from "../controllers/authController";

const authRouter = Router();

authRouter.route("/login").post(login);
authRouter.route("/refresh").get(refresh);

export default authRouter;
