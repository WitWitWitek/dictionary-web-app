import { useState } from 'react';
import WordForm from './WordForm';
import WordOutput from './WordOutput/WordOutput';
import { WordData } from '@/types';

export default function WordSearch() {
  const [wordData, setWordData] = useState<WordData | null>(null);
  return (
    <section>
      <WordForm setWordData={setWordData} />
      <WordOutput wordData={wordData} />
    </section>
  );
}
