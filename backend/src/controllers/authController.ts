import { RequestHandler } from "express";
import { compare } from "bcrypt";
import { CustomError } from "../utils/customError";
import { signToken, verifyToken } from "../utils/tokenHandlers";
import { clearCookie, setCookie } from "../utils/cookieHandlers";
import { findUser } from "../services/userService";

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomError("All credentials are required", 400);
  }

  const foundUser = await findUser(username);

  const passwordsMatch = await compare(password, foundUser.password);
  if (!passwordsMatch) {
    throw new CustomError("Unathorized. Invalid Password.", 401);
  }

  const accessToken = signToken(foundUser.username, "access");
  const refreshToken = signToken(foundUser.username, "refresh");

  setCookie(res, refreshToken);
  res.json({ accessToken });
};

export const refresh: RequestHandler = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.jwt) {
    throw new CustomError("Unauthorized.", 401);
  }

  const refreshToken = cookies.jwt;
  const { username } = verifyToken(refreshToken, "refresh");

  const foundUser = await findUser(username);

  const accessToken = signToken(foundUser.username, "access");

  res.json({ accessToken });
};

export const logut: RequestHandler = async (req, res) => {
  const cookies = req.cookies;
  const isJwtCookie = "jwt" in cookies;

  if (!isJwtCookie) return res.sendStatus(204);

  clearCookie(res);
  res.status(200).json({ message: "Cookie cleared" });
};
