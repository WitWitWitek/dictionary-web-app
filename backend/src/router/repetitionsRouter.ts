import { Router } from "express";
import { addNewRepetition } from "../controllers/repetitionController";
import authMiddleware from "../middleware/authMiddleware";

const repetitionsRouter = Router();

repetitionsRouter.use(authMiddleware);
repetitionsRouter.route("/").post(addNewRepetition);

export default repetitionsRouter;
