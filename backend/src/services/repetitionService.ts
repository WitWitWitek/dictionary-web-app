import { Repetition } from "@/entity/Repetition";
import { RepetitionScore } from "@/entity/RepetitionScore";
import { User } from "@/entity/User";
import { HTTP_CODES } from "@/types";
import { CustomError } from "@/utils/customError";

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

export async function addScoreToRepetition(repetitionId: string, score: number): Promise<string> {
  const repetition = await Repetition.findOne({ where: { id: repetitionId } });

  if (!repetition) {
    throw new CustomError("Such repetition does not exist", HTTP_CODES.BAD_REQUEST);
  }

  const repetitionScore = new RepetitionScore();
  repetitionScore.value = score;
  repetitionScore.repetition = repetition;

  await repetitionScore.save();

  const { avgScoreValue } = await RepetitionScore.createQueryBuilder("repetitionScore")
    .select("AVG(repetitionScore.value)", "avgScoreValue")
    .where("repetitionScore.repetitionId = :id", { id: repetitionId })
    .getRawOne();

  const updatedRepetitionAvgScore = avgScoreValue === null ? score : +Number(avgScoreValue).toFixed(2);
  repetition.averageScore = updatedRepetitionAvgScore;
  await repetition.save();
  return repetition.id;
}

export async function deleteRepetitionById(repetitionId: string): Promise<void> {
  const repetition = await Repetition.findOneBy({ id: repetitionId });
  if (!repetition) {
    throw new CustomError("Such repetition does not exist", HTTP_CODES.BAD_REQUEST);
  }
  await repetition.remove();
}
