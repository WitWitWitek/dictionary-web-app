import { CustomError } from "@/utils/customError";
import { RequestHandler } from "express";
import { createUser } from "@/services/userService";

export const signUpNewUser: RequestHandler = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password) {
    throw new CustomError("Credentials required!", 400);
  }

  await createUser({ username, password, email });
  return res.status(201).json({ message: `User ${username} successfully registered.` });
};
