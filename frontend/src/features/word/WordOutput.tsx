import WordPhonetics from './WordPhonetics';

type WordOutputProps = {
  wordData: WordData;
};

export default function WordOutput({ wordData }: WordOutputProps) {
  return (
    <div>
      <h1>{wordData.word}</h1>
      <p>{wordData.phonetic}</p>
      <WordPhonetics phonetics={wordData.phonetics} />
      {wordData.meanings.map((meaning) => (
        <ul key={Math.random()}>
          {meaning.definitions.map(
            (definition) => definition.example
                && <li key={Math.random()}>{definition.example}</li>,
          )}
        </ul>
      ))}
    </div>
  );
}
