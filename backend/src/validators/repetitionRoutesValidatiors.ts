import { Request, Response, NextFunction } from "express";
import { CustomError } from "@/utils/customError";
import { HTTP_CODES } from "@/types";

export const validateNewRepetitionRoute = async (req: Request, res: Response, next: NextFunction) => {
  const { content } = req.body;
  if (!content || typeof content !== "string") {
    throw new CustomError("Content field is required!", HTTP_CODES.BAD_REQUEST);
  }
  if (typeof content !== "string") {
    throw new CustomError("Content should be a type of string!", HTTP_CODES.BAD_REQUEST);
  }
  return next();
};

export const validateAsssessRepetitionRoute = async (req: Request, res: Response, next: NextFunction) => {
  const { repetitionScore } = req.body;
  const allowedValues = [1, 3, 5];
  if (!repetitionScore) {
    throw new CustomError("Score of repetition is required!", HTTP_CODES.BAD_REQUEST);
  }
  if (typeof repetitionScore !== "number") {
    throw new CustomError("Score of repetition should be a type of number!", HTTP_CODES.BAD_REQUEST);
  }
  if (!allowedValues.includes(repetitionScore)) {
    throw new CustomError("The score of repetition should be a value equal to 1, 3, or 5!", HTTP_CODES.BAD_REQUEST);
  }
  return next();
};
