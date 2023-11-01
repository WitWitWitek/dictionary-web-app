import { Repetition } from "@/entity/Repetition";

export interface findAllRepetitionResponse {
  repetitions: Repetition[];
  totalCount: number;
  currentPage: number;
  lastPage: number;
}
