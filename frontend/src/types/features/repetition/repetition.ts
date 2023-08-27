export interface Repetition {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type GetRepetitionsResponse = Repetition[];

export interface PostRepetitionRequest {
  content: string;
}

export interface PostRepetitionResponse {
  message: string;
}

export enum MarkValue {
  Bad = 'Bad',
  Mediocrely = 'Mediocrely',
  Excellent = 'Excellent',
}
