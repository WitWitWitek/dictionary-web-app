import { Router } from "express";
import { addNewRepetition, asssessRepetition, getAllRepetitions } from "@/controllers/repetitionController";
import authMiddleware from "@/middleware/authMiddleware";
import { validateAsssessRepetitionRoute, validateNewRepetitionRoute } from "@/validators/repetitionRoutesValidatiors";

const repetitionsRouter = Router();

repetitionsRouter.use(authMiddleware);
repetitionsRouter.route("/").get(getAllRepetitions).post(validateNewRepetitionRoute, addNewRepetition);
repetitionsRouter.route("/:repetitionId/score").post(validateAsssessRepetitionRoute, asssessRepetition);

export default repetitionsRouter;
