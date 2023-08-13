import { Repetition } from "../entity/Repetition";

export async function findAllRepetitions(): Promise<Repetition[]> {
  return Repetition.find({
    order: {
      createdAt: "DESC",
    },
  });
}

export async function createNewRepetition(content: string): Promise<string> {
  const newRepetition = new Repetition();
  newRepetition.content = content;
  const savedRepetition = await newRepetition.save();
  return savedRepetition.id;
}
