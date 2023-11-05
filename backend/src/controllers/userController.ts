import { RequestHandler } from "express";
import { createUser, getUserDataById } from "@/services/userService";
import { HTTP_CODES } from "@/types";

export const signUpNewUser: RequestHandler = async (req, res) => {
  const { username, password, email } = req.body;
  await createUser({ username, password, email });
  return res.status(HTTP_CODES.CREATED).json({ message: `User ${username} successfully registered.` });
};

export const getUserData: RequestHandler = async (req, res) => {
  const userId = "118c9d34-3442-4764-a4ba-dd94a56fd68d";
  // const userId = req.user.id;
  const userData = await getUserDataById(userId);
  return res.status(HTTP_CODES.CREATED).json(userData);
};
