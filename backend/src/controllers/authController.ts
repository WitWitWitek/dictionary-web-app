import { RequestHandler } from "express";
import { compare } from "bcrypt";
import { User } from "../entity/User";
import { AppDataSource } from "../dataSource";
import { CustomError } from "../utils/customError";
import { signToken, verifyToken } from "../utils/tokenHandlers";

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

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
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
