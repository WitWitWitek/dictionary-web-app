import { Response } from "express";
import { createNewRepetition, findAllRepetitions } from "@/services/repetitionService";
import { HTTP_CODES, RequestWithUserRole } from "@/types";
import { findUser } from "@/services/userService";
import { Repetition } from "@/entity/Repetition";
import { RepetitionScore } from "@/entity/RepetitionScore";

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
  const score = new RepetitionScore();
  score.value = 7;
  score.repetition = repetition;
  await score.save();

  const { avgScoreValue } = await RepetitionScore.createQueryBuilder("repetitionScoreAvgValue")
    .select("AVG(repetitionScoreAvgValue.value)", "avgScoreValue")
    .getRawOne();

  repetition.averageScore = avgScoreValue;
  repetition.save();

  return res.status(HTTP_CODES.CREATED).json({ message: `Score of repetition with id: ${repetition.id} added.` });
};
