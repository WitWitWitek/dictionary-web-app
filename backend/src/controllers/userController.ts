import { RequestHandler } from "express";
import { changeUserPassword, createUser, findUser, getUserDataById } from "../services/userService";
import { HTTP_CODES, RequestWithUserRole } from "../types";
import { sendVerificationEmail } from "../services/emailService";
import { verifyToken } from "../utils/tokenHandlers";

export const signUpNewUser: RequestHandler = async (req, res) => {
  const { username, password, email } = req.body;
  await createUser({ username, password, email });
  await sendVerificationEmail(email, username);
  return res.status(HTTP_CODES.CREATED).json({ message: `User ${username} successfully registered.` });
};

export const getUserData: RequestHandler = async (req: RequestWithUserRole, res) => {
  const userId = req.user.id;
  const userData = await getUserDataById(userId);
  return res.status(HTTP_CODES.CREATED).json({ username: req.user.username, ...userData });
};

export const deleteUser: RequestHandler = async (req: RequestWithUserRole, res) => {
  await req.user.remove();
  return res.status(HTTP_CODES.CREATED).json({ message: "User successfully deleted." });
};

export const updateUserPassword: RequestHandler = async (req: RequestWithUserRole, res) => {
  const { password, newPassword } = req.body;
  await changeUserPassword(password, newPassword, req.user);
  return res.status(HTTP_CODES.CREATED).json({ message: "User password has been updated." });
};

export const verifyUser: RequestHandler = async (req, res) => {
  const { emailToken } = req.params;
  const { username } = verifyToken(emailToken, "email");
  const foundUser = await findUser(username);
  foundUser.confirmed = true;
  await foundUser.save();
  return res.status(HTTP_CODES.CREATED).json({ message: "User verified. Please log in." });
};
