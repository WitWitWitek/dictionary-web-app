import { RequestHandler } from "express";
import { compare } from "bcrypt";
import { CustomError } from "@/utils/customError";
import { signToken, verifyToken } from "@/utils/tokenHandlers";
import { clearCookie, setCookie } from "@/utils/cookieHandlers";
import { findUser } from "@/services/userService";
import { HTTP_CODES } from "@/types";

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await findUser(username);

  const passwordsMatch = await compare(password, foundUser.password);
  if (!passwordsMatch) {
    throw new CustomError("Unathorized. Invalid Password.", HTTP_CODES.UNAUTHORIZED);
  }

  const accessToken = signToken(foundUser.username, "access");
  const refreshToken = signToken(foundUser.username, "refresh");

  setCookie(res, refreshToken);
  res.json({ accessToken });
};

export const refresh: RequestHandler = async (req, res) => {
  const cookies = req.cookies;

  const refreshToken = cookies.jwt;
  const { username } = verifyToken(refreshToken, "refresh");

  const foundUser = await findUser(username);

  const accessToken = signToken(foundUser.username, "access");

  res.json({ accessToken });
};

export const logut: RequestHandler = async (req, res) => {
  const cookies = req.cookies;
  const isJwtCookie = "jwt" in cookies;

  if (!isJwtCookie) return res.sendStatus(HTTP_CODES.NO_CONTENT);

  clearCookie(res);
  res.status(HTTP_CODES.OK).json({ message: "Cookie cleared" });
};
