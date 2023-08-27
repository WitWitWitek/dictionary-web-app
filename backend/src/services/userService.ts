import { hash } from "bcrypt";
import { AppDataSource } from "@/dataSource";
import { User } from "@/entity/User";
import { CustomError } from "@/utils/customError";

export async function findUser(username: string): Promise<User> {
  const userRepository = AppDataSource.getRepository(User);
  const foundUser = await userRepository.findOneBy({
    username: username,
  });

  if (!foundUser) {
    throw new CustomError("User does not exist", 401);
  }
  return foundUser;
}

export async function createUser({
  username,
  password,
  email,
}: {
  username: string;
  password: string;
  email: string;
}): Promise<string> {
  const hashedPassword = await hash(password, 15);

  const newUser = new User();
  newUser.username = username;
  newUser.email = email;
  newUser.password = hashedPassword;
  const savedUser = await newUser.save();
  return savedUser.id;
}
