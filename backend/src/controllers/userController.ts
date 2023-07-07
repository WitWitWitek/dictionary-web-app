import { CustomError } from "../utils/customError";
import { RequestHandler } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../dataSource";

export const signUpNewUser: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomError("Credentials required!", 400);
  }

  try {
    const newUser = new User();
    newUser.username = username;
    newUser.password = password;
    AppDataSource.manager.save(newUser);
    return res.status(201).json({ message: "User registered" });
  } catch (err) {
    throw new Error(err.message);
  }
};
