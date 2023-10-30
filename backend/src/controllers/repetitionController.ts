import { Response } from "express";
import {
  addScoreToRepetition,
  addTranslation,
  createNewRepetition,
  deleteRepetitionById,
  findAllRepetitions,
  findTodayRepetitions,
} from "@/services/repetitionService";
import { HTTP_CODES, RequestWithUserRole } from "@/types";
import { findUser } from "@/services/userService";

export const getAllRepetitions = async (req: RequestWithUserRole, res: Response) => {
  const repetitions = await findAllRepetitions(req.user);
  return res.status(HTTP_CODES.OK).json(repetitions);
};

export const getTodayRepetitions = async (req: RequestWithUserRole, res: Response) => {
  const repetitions = await findTodayRepetitions(req.user);
  return res.status(HTTP_CODES.OK).json(repetitions);
};

export const addNewRepetition = async (req: RequestWithUserRole, res: Response) => {
  const { content, word } = req.body;
  const foundUser = await findUser(req.user);
  const newRepetitionId = await createNewRepetition(content, word, foundUser);
  return res.status(HTTP_CODES.CREATED).json({ message: `Repetition with id: ${newRepetitionId} created.` });
};

export const asssessRepetition = async (req: RequestWithUserRole, res: Response) => {
  const { repetitionId } = req.params;
  const { repetitionScore } = req.body;
  await addScoreToRepetition(repetitionId, repetitionScore as number);
  return res.status(HTTP_CODES.CREATED).json({ message: `Score of repetition with id: ${repetitionId} added.` });
};

export const addTranslationToRepetition = async (req: RequestWithUserRole, res: Response) => {
  const { repetitionId } = req.params;
  const { translation } = req.body;
  await addTranslation(repetitionId, translation);
  return res.status(HTTP_CODES.CREATED).json({ message: `Translation of repetition with id: ${repetitionId} added.` });
};

export const deleteRepetition = async (req: RequestWithUserRole, res: Response) => {
  const { repetitionId } = req.params;
  await deleteRepetitionById(repetitionId);
  return res.status(HTTP_CODES.CREATED).json({ message: `Repetition with id: ${repetitionId} removed.` });
};
