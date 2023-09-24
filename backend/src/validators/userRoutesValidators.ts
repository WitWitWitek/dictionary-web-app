import { Request, Response, NextFunction } from "express";
import { CustomError } from "@/utils/customError";
import { HTTP_CODES } from "@/types";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,20}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;
const EMAIL_REGEX = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export const validateNewUserRoute = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    throw new CustomError("Credentials required!", HTTP_CODES.BAD_REQUEST);
  }

  const usernameCheck = new RegExp(USER_REGEX);
  if (!usernameCheck.test(username)) {
    throw new CustomError("Invalid username!", HTTP_CODES.BAD_REQUEST);
  }

  const passwordCheck = new RegExp(PASSWORD_REGEX);
  if (!passwordCheck.test(password)) {
    throw new CustomError("Password is too weak!", HTTP_CODES.BAD_REQUEST);
  }

  const emailCheck = new RegExp(EMAIL_REGEX);
  if (!emailCheck.test(email)) {
    throw new CustomError("Email is invalid!", HTTP_CODES.BAD_REQUEST);
  }

  return next();
};
