export interface Repetition {
  id: string;
  content: string;
  averageScore: string;
  createdAt: string;
  updatedAt: string;
}

export type GetRepetitionsResponse = Repetition[];

export interface BasicRepetitionResponse {
  message: string;
}

export interface PostRepetitionRequest {
  content: string;
}

export interface AssessRepetitionRequest {
  id: string;
  repetitionScore: 1 | 3 | 5;
}

export interface DeleteRepetitionRequest {
  id: string;
}

export enum MarkValue {
  Bad = 'Bad',
  Mediocrely = 'Mediocrely',
  Excellent = 'Excellent',
}
