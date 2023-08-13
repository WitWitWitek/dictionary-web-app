interface WordData {
  word: string;
  phonetic: string;
  meanings: Meaning[];
  phonetics: Phonetic[];
  sourceUrls: Source[];
}

interface Meaning {
  definitions: Definition[];
  synonyms: Synonym[];
  antonyms: Antonym[];
  partOfSpeech: string;
}

interface Definition {
  definition: string;
  example: string;
}

interface Phonetic {
  audio: string;
  text: string;
}

type Synonym = string;
type Antonym = string;
type Source = string;

type Theme = 'dark' | 'light';

interface Repetition {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
type GetRepetitionsResponse = Repetition[];
