import { CustomError } from "@/utils/customError";
import { RequestHandler } from "express";
import { createUser } from "@/services/userService";
import { HTTP_CODES } from "@/types";

export const signUpNewUser: RequestHandler = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password) {
    throw new CustomError("Credentials required!", HTTP_CODES.BAD_REQUEST);
  }

  await createUser({ username, password, email });
  return res.status(HTTP_CODES.CREATED).json({ message: `User ${username} successfully registered.` });
};
