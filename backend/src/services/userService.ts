import { hash, compare } from "bcrypt";
import { User } from "../entity/User";
import { CustomError } from "../utils/customError";
import { HTTP_CODES } from "../types";
import { Repetition } from "../entity/Repetition";
import { RepetitionScore } from "../entity/RepetitionScore";

export async function findUser(username: string): Promise<User> {
  const foundUser = await User.findOneBy({ username });
  if (!foundUser) {
    throw new CustomError("User does not exist", HTTP_CODES.UNAUTHORIZED);
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
  const existingUser = await User.findOneBy({ username });
  const existingEmail = await User.findOneBy({ email });

  if (existingUser) {
    throw new CustomError("User already exists!", HTTP_CODES.BAD_REQUEST);
  }

  if (existingEmail) {
    throw new CustomError("Email already used!", HTTP_CODES.BAD_REQUEST);
  }

  const newUser = new User();
  newUser.username = username;
  newUser.email = email;
  newUser.password = hashedPassword;
  const savedUser = await newUser.save();
  return savedUser.id;
}

export async function getUserDataById(userId: string) {
  const repetitonsCount = await Repetition.createQueryBuilder("repetition")
    .where("repetition.userId = :userId", {
      userId,
    })
    .getCount();

  const excercisesCount = await RepetitionScore.createQueryBuilder("repetitionScore")
    .where("repetitionScore.userId = :userId", {
      userId,
    })
    .getCount();

  return {
    repetitonsCount,
    excercisesCount,
  };
}

export async function changeUserPassword(password: string, newPassword: string, user: User) {
  const passwordsMatch = await compare(password, user.password);

  if (!passwordsMatch) {
    throw new CustomError("Invalid old password!", HTTP_CODES.BAD_REQUEST);
  }

  const hashedPassword = await hash(newPassword, 15);

  await User.createQueryBuilder("user")
    .update(User)
    .set({ password: hashedPassword })
    .where("id = :id", {
      id: user.id,
    })
    .execute();
}
