import WordHeader from './WordHeader';
import WordMeaningsList from './WordMeaningsList';
import { WordData } from '@/types';

type WordOutputProps = {
  wordData: WordData | null;
};

export default function WordOutput({ wordData }: WordOutputProps) {
  if (!wordData) return null;
  return (
    <div>
      <WordHeader title={wordData.word} phonetic={wordData.phonetic} phonetics={wordData.phonetics} />
      <WordMeaningsList meanings={wordData.meanings} />
      <div>
        <h3>Source:</h3>
        {wordData.sourceUrls.map((source) => (
          <div key={source}>
            <a href={source}>{source}</a>
          </div>
        ))}
      </div>
    </div>
  );
}
