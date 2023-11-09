import { Request, Response, NextFunction } from "express";
import { CustomError } from "@/utils/customError";
import { HTTP_CODES } from "@/types";

export const validateLoginRoute = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomError("All credentials are required", HTTP_CODES.BAD_REQUEST);
  }
  return next();
};

export const validateRefreshRoute = async (req: Request, res: Response, next: NextFunction) => {
  const { cookies } = req;
  if (!cookies?.jwt) {
    throw new CustomError("Unauthorized.", HTTP_CODES.UNAUTHORIZED);
  }
  return next();
};
