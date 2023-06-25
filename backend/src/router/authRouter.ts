import { Router } from "express";
import { login } from "../controllers/authController";

const authRouter = Router();

authRouter.route("/login").post(login);

export default authRouter;
