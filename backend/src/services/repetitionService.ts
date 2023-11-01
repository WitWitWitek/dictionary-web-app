import { Repetition } from "@/entity/Repetition";
import { RepetitionScore } from "@/entity/RepetitionScore";
import { User } from "@/entity/User";
import { HTTP_CODES, findAllRepetitionResponse } from "@/types";
import { CustomError } from "@/utils/customError";
import { LessThan, IsNull } from "typeorm";

export async function findAllRepetitions(username: string, currentPage = 1): Promise<findAllRepetitionResponse> {
  const maxPerPage = 6;
  const [repetitions, totalCount] = await Repetition.findAndCount({
    order: {
      createdAt: "DESC",
    },
    where: {
      user: {
        username: username,
      },
    },
    skip: (currentPage - 1) * maxPerPage,
    take: maxPerPage,
  });
  return {
    repetitions,
    totalCount,
    currentPage,
    lastPage: Math.ceil(totalCount / maxPerPage),
  };
}

export async function findTodayRepetitions(username: string): Promise<Repetition[]> {
  const today = new Date().setHours(0, 0, 0, 0);

  return Repetition.find({
    order: {
      createdAt: "DESC",
    },
    where: [
      {
        user: {
          username: username,
        },
        repeatedAt: LessThan(new Date(today)),
      },
      {
        user: {
          username: username,
        },
        repeatedAt: IsNull(),
      },
    ],
  });
}

export async function createNewRepetition(content: string, word: string, user: User): Promise<string> {
  const newRepetition = new Repetition();
  newRepetition.content = content;
  newRepetition.word = word;
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
  const repeatedAt = new Date().toISOString();
  const updatedRepetitionAvgScore = avgScoreValue === null ? score : +Number(avgScoreValue).toFixed(2);
  repetition.averageScore = updatedRepetitionAvgScore;
  repetition.repeatedAt = new Date(repeatedAt);
  await repetition.save();
  return repetition.id;
}

export async function addTranslation(repetitionId: string, translation: string): Promise<string> {
  const repetition = await Repetition.findOne({ where: { id: repetitionId } });

  if (!repetition) {
    throw new CustomError("Such repetition does not exist", HTTP_CODES.BAD_REQUEST);
  }
  repetition.translation = translation;
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
