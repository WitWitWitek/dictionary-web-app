import { RequestHandler } from "express";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { User } from "../entity/User";
import { AppDataSource } from "../dataSource";
import { CustomError } from "../utils/customError";

export const login: RequestHandler = async (req, res, next) => {
  // refactor needed
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

  const accessToken = sign(
    {
      username: foundUser.username,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15m" }
  );

  const refreshToken = sign(
    {
      username: foundUser.username,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "1d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });
};
