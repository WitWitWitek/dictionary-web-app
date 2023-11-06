import { RequestHandler } from "express";
import { Response } from "express";
import { createUser, getUserDataById } from "@/services/userService";
import { HTTP_CODES, RequestWithUserRole } from "@/types";

export const signUpNewUser: RequestHandler = async (req, res) => {
  const { username, password, email } = req.body;
  await createUser({ username, password, email });
  return res.status(HTTP_CODES.CREATED).json({ message: `User ${username} successfully registered.` });
};

export const getUserData: RequestHandler = async (req: RequestWithUserRole, res: Response) => {
  const userId = req.user.id;
  const userData = await getUserDataById(userId);
  return res.status(HTTP_CODES.CREATED).json({ username: req.user.username, ...userData });
};

export const deleteUser: RequestHandler = async (req: RequestWithUserRole, res: Response) => {
  await req.user.remove();
  return res.status(HTTP_CODES.CREATED).json({ message: "User successfully deleted." });
};
