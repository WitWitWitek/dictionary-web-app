import { Response } from "express";
import { CustomError } from "@/utils/customError";
import { createNewRepetition, findAllRepetitions } from "@/services/repetitionService";
import { HTTP_CODES, RequestWithUserRole } from "@/types";
import { findUser } from "@/services/userService";

export const getAllRepetitions = async (req: RequestWithUserRole, res: Response) => {
  const repetitions = await findAllRepetitions(req.user);
  return res.status(HTTP_CODES.OK).json(repetitions);
};

export const addNewRepetition = async (req: RequestWithUserRole, res: Response) => {
  const { content } = req.body;
  const username = req.user;
  if (!content || typeof content !== "string") {
    throw new CustomError("Content field is required!", HTTP_CODES.BAD_REQUEST);
  }

  const foundUser = await findUser(username);

  const newRepetitionId = await createNewRepetition(content, foundUser);
  return res.status(HTTP_CODES.CREATED).json({ message: `Repetition with id: ${newRepetitionId} created.` });
};
