export interface WordData {
  word: string;
  phonetic: string;
  meanings: Meaning[];
  phonetics: Phonetic[];
  sourceUrls: Source[];
}

export interface Meaning {
  definitions: Definition[];
  synonyms: Synonym[];
  antonyms: Antonym[];
  partOfSpeech: string;
}

export interface Definition {
  definition: string;
  example: string;
}

export interface Phonetic {
  audio: string;
  text: string;
}

export type Synonym = string;
export type Antonym = string;
export type Source = string;
