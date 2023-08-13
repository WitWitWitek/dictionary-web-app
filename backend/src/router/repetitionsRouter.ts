import { Router } from "express";
import { addNewRepetition, getAllRepetitions } from "../controllers/repetitionController";
import authMiddleware from "../middleware/authMiddleware";

const repetitionsRouter = Router();

repetitionsRouter.use(authMiddleware);
repetitionsRouter.route("/").get(getAllRepetitions).post(addNewRepetition);

export default repetitionsRouter;
