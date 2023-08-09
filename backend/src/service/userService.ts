import { AppDataSource } from "../dataSource";
import { User } from "../entity/User";
import { CustomError } from "../utils/customError";

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
