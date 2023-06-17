import { useState } from 'react';
import WordForm from './WordForm';
import WordOutput from './WordOutput/WordOutput';

type Props = {
  theme: Theme
};

export default function WordSearch({ theme } : Props) {
  const [wordData, setWordData] = useState<WordData | null>(null);
  return (
    <section className={`theme-${theme} theme-default`}>
      <WordForm setWordData={setWordData} />
      <WordOutput wordData={wordData} />
    </section>
  );
}
