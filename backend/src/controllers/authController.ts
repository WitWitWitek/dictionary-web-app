import { RequestHandler } from "express";
import { compare } from "bcrypt";
import { User } from "../entity/User";
import { AppDataSource } from "../dataSource";
import { CustomError } from "../utils/customError";
import { signToken, verifyToken } from "../utils/tokenHandlers";
import { clearCookie, setCookie } from "../utils/cookieHandlers";

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomError("All credentials are required", 400);
  }

  const userRepository = AppDataSource.getRepository(User);
  const foundUser = await userRepository.findOneBy({
    username: username,
  });

  if (!foundUser) {
    throw new CustomError("User does not exist", 401);
  }

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

  try {
    const refreshToken = cookies.jwt;
    const { username } = verifyToken(refreshToken, "refresh");

    const userRepository = AppDataSource.getRepository(User);
    const foundUser = await userRepository.findOneBy({
      username,
    });

    if (!foundUser) {
      throw new CustomError("User does not exist", 401);
    }

    const accessToken = signToken(foundUser.username, "access");

    res.json({ accessToken });
  } catch (err) {
    throw new CustomError("Forbidden.", 403);
  }
};

export const logut: RequestHandler = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.sendStatus(204);
    return;
  }

  clearCookie(res);
  res.status(200).json({ message: "Cookie cleared" });
};
