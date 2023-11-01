export interface Repetition {
  id: string;
  content: string;
  translation: string | null;
  word: string;
  averageScore: string;
  createdAt: string;
  updatedAt: string;
  repeatedAt: string;
}

export type GetRepetitionsResponse = {
  repetitions: Repetition[];
  totalCount: number;
  currentPage: number;
  lastPage: number;
};

export type GetRepetitionsRequest = {
  page: number;
};

export interface BasicRepetitionResponse {
  message: string;
}

export interface PostRepetitionRequest {
  content: string;
  word: string;
}

export interface AssessRepetitionRequest {
  id: string;
  repetitionScore: 1 | 3 | 5;
}

export interface TranslationInterface {
  translation: string;
}

export interface AddTranslationRequest extends TranslationInterface {
  id: string;
}

export interface DeleteRepetitionRequest {
  id: string;
}

export enum MarkValue {
  Bad = 'Bad',
  Mediocrely = 'Mediocrely',
  Excellent = 'Excellent',
}
