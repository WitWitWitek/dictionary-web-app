import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";
import { HTTP_CODES } from "../types";

export const validateNewRepetitionRoute = async (req: Request, res: Response, next: NextFunction) => {
  const { content, word } = req.body;
  if (!content) {
    throw new CustomError("Content field is required!", HTTP_CODES.BAD_REQUEST);
  }
  if (typeof content !== "string") {
    throw new CustomError("Content should be a type of string!", HTTP_CODES.BAD_REQUEST);
  }
  if (content.length > 255) {
    throw new CustomError("Repetition should be at most 255 characters in length.!", HTTP_CODES.BAD_REQUEST);
  }
  if (!word) {
    throw new CustomError("Word field is required!", HTTP_CODES.BAD_REQUEST);
  }
  if (typeof word !== "string") {
    throw new CustomError("Word should be a type of string!", HTTP_CODES.BAD_REQUEST);
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

export const validateAddTranslationRoute = async (req: Request, res: Response, next: NextFunction) => {
  const { translation } = req.body;
  if (!translation) {
    throw new CustomError("Translation field is required!", HTTP_CODES.BAD_REQUEST);
  }
  if (typeof translation !== "string") {
    throw new CustomError("Translation should be a type of string!", HTTP_CODES.BAD_REQUEST);
  }
  if (translation.length > 255) {
    throw new CustomError("Translations should be at most 255 characters in length.!", HTTP_CODES.BAD_REQUEST);
  }
  return next();
};
