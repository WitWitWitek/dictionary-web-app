import { Router } from "express";
import {
  addNewRepetition,
  asssessRepetition,
  deleteRepetition,
  getAllRepetitions,
  getTodayRepetitions,
} from "@/controllers/repetitionController";
import authMiddleware from "@/middleware/authMiddleware";
import { validateAsssessRepetitionRoute, validateNewRepetitionRoute } from "@/validators/repetitionRoutesValidatiors";

const repetitionsRouter = Router();

repetitionsRouter.use(authMiddleware);
repetitionsRouter.route("/").get(getAllRepetitions).post(validateNewRepetitionRoute, addNewRepetition);
repetitionsRouter.route("/today-repetitions").get(getTodayRepetitions);
repetitionsRouter.route("/:repetitionId").delete(deleteRepetition);
repetitionsRouter.route("/:repetitionId/score").patch(validateAsssessRepetitionRoute, asssessRepetition);

export default repetitionsRouter;
