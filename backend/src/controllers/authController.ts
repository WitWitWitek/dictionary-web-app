import { RequestHandler } from "express";
import { sign, verify, JwtPayload } from "jsonwebtoken";
import { compare } from "bcrypt";
import { User } from "../entity/User";
import { AppDataSource } from "../dataSource";
import { CustomError } from "../utils/customError";

interface JwtPayloadWithUsername extends JwtPayload {
  username: string;
}

const accessTokenExpirationTime = "30s";
const refreshTokenExpirationTime = "3m";

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
    { expiresIn: accessTokenExpirationTime }
  );

  const refreshToken = sign(
    {
      username: foundUser.username,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: refreshTokenExpirationTime }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });
};

export const refresh: RequestHandler = async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies.jwt) {
    throw new CustomError("Unauthorized.", 401);
  }

  try {
    const refreshToken = cookies.jwt;
    const { username } = verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as JwtPayloadWithUsername;

    const userRepository = AppDataSource.getRepository(User);
    const foundUser = await userRepository.findOneBy({
      username,
    });

    if (!foundUser) {
      throw new CustomError("User does not exist", 401);
    }

    const accessToken = sign(
      {
        UserInfo: {
          username: foundUser.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: accessTokenExpirationTime }
    );

    res.json({ accessToken });
  } catch (err) {
    throw new CustomError("Forbidden.", 403);
  }
};
