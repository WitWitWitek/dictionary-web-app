import { Router } from "express";
import { addNewRepetition, asssessRepetition, getAllRepetitions } from "@/controllers/repetitionController";
import authMiddleware from "@/middleware/authMiddleware";
import { validateNewRepetitionRoute } from "@/validators/repetitionRoutesValidatiors";

const repetitionsRouter = Router();

repetitionsRouter.use(authMiddleware);
repetitionsRouter.route("/").get(getAllRepetitions).post(validateNewRepetitionRoute, addNewRepetition);
repetitionsRouter.route("/:repetitionId/assessment").post(asssessRepetition);

export default repetitionsRouter;
