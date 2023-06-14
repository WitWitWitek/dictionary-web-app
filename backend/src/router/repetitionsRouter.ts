import { Router } from "express";
import { addNewRepetition } from "../controllers/repetitionController";

const repetitionsRouter = Router();

repetitionsRouter.route("/repetitions").post(addNewRepetition);

export default repetitionsRouter;
