import { RequestHandler } from "express";
import { CustomError } from "../utils/customError";
import { createNewRepetition, findAllRepetitions } from "../services/repetitionService";

export const getAllRepetitions: RequestHandler = async (req, res) => {
  const repetitions = await findAllRepetitions();
  return res.status(200).json(repetitions);
};

export const addNewRepetition: RequestHandler = async (req, res) => {
  const { content } = req.body;
  if (!content || typeof content !== "string") {
    throw new CustomError("Content field is required!", 400);
  }

  const newRepetitionId = await createNewRepetition(content);
  return res.status(201).json({ message: `Repetition with id: ${newRepetitionId} created.` });
};
