import { Repetition } from "../entity/Repetition";
import { User } from "../entity/User";

export async function findAllRepetitions(username: string): Promise<Repetition[]> {
  return Repetition.find({
    order: {
      createdAt: "DESC",
    },
    where: {
      user: {
        username: username,
      },
    },
  });
}

export async function createNewRepetition(content: string, user: User): Promise<string> {
  const newRepetition = new Repetition();
  newRepetition.content = content;
  newRepetition.user = user;
  const savedRepetition = await newRepetition.save();
  return savedRepetition.id;
}
