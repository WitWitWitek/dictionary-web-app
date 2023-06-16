import { useState } from 'react';
import WordForm from './WordForm';
import WordOutput from './WordOutput/WordOutput';

export default function WordSearch() {
  const [wordData, setWordData] = useState<WordData | null>(null);
  return (
    <section className="theme-default">
      <WordForm setWordData={setWordData} />
      <WordOutput wordData={wordData} />
    </section>
  );
}
