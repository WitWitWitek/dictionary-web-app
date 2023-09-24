import { Request, Response, NextFunction } from "express";
import { CustomError } from "@/utils/customError";
import { HTTP_CODES } from "@/types";

export const validateNewRepetitionRoute = async (req: Request, res: Response, next: NextFunction) => {
  const { content } = req.body;
  if (!content || typeof content !== "string") {
    throw new CustomError("Content field is required!", HTTP_CODES.BAD_REQUEST);
  }
  return next();
};
