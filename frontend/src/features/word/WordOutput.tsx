import WordHeader from './WordHeader';
import WordMeanings from './WordMeanings';

type WordOutputProps = {
  wordData: WordData;
};

export default function WordOutput({ wordData }: WordOutputProps) {
  return (
    <div>
      <WordHeader
        title={wordData.word}
        phonetic={wordData.phonetic}
        phonetics={wordData.phonetics}
      />
      <WordMeanings meanings={wordData.meanings} />
    </div>
  );
}
