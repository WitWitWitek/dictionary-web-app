import { RequestHandler } from "express";
import { createUser } from "@/services/userService";
import { HTTP_CODES } from "@/types";

export const signUpNewUser: RequestHandler = async (req, res) => {
  const { username, password, email } = req.body;
  await createUser({ username, password, email });
  return res.status(HTTP_CODES.CREATED).json({ message: `User ${username} successfully registered.` });
};
