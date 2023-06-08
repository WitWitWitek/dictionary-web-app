import WordHeader from './WordHeader';
import WordMeaningsList from './WordMeaningsList';

type WordOutputProps = {
  wordData: WordData | null;
};

export default function WordOutput({ wordData }: WordOutputProps) {
  if (!wordData) return null;
  return (
    <div>
      <WordHeader
        title={wordData.word}
        phonetic={wordData.phonetic}
        phonetics={wordData.phonetics}
      />
      <hr />
      <WordMeaningsList meanings={wordData.meanings} />
      <hr />
      {wordData.sourceUrls.map((source) => <div key={source}><a href={source}>{source}</a></div>)}
    </div>
  );
}
