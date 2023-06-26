import { RequestHandler } from "express";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All credentials are required" });
  }

  const userRepository = AppDataSource.getRepository(User);
  const foundUser = await userRepository.findOneBy({
    username: username,
  });

  if (!foundUser) {
    res.status(401).json({ message: "User does not exist" });
    return;
  }

  const passwordsMatch = await compare(password, foundUser.password);
  if (!passwordsMatch) {
    res.status(401).json({ message: "Unathorized. Invalid Password." });
    return;
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
