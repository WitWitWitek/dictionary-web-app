import { Response } from "express";
import { createNewRepetition, findAllRepetitions } from "@/services/repetitionService";
import { HTTP_CODES, RequestWithUserRole } from "@/types";
import { findUser } from "@/services/userService";
import { Repetition } from "@/entity/Repetition";
import { RepetitionAssessment } from "@/entity/RepetitionAssessment";

export const getAllRepetitions = async (req: RequestWithUserRole, res: Response) => {
  const repetitions = await findAllRepetitions(req.user);
  return res.status(HTTP_CODES.OK).json(repetitions);
};

export const addNewRepetition = async (req: RequestWithUserRole, res: Response) => {
  const { content } = req.body;
  const foundUser = await findUser(req.user);
  const newRepetitionId = await createNewRepetition(content, foundUser);
  return res.status(HTTP_CODES.CREATED).json({ message: `Repetition with id: ${newRepetitionId} created.` });
};

export const asssessRepetition = async (req: RequestWithUserRole, res: Response) => {
  const { repetitionId } = req.params;

  const repetition = await Repetition.findOne({ where: { id: repetitionId } });
  const assessment = new RepetitionAssessment();
  assessment.value = 3;
  assessment.repetition = repetition;
  await assessment.save();
  return res.status(HTTP_CODES.CREATED).json({ message: `Assessment to repetition with id: ${repetition.id} added.` });
};
