type Props = {
  wordData: WordData[];
};

export default function WordOutput({ wordData }: Props) {
  return (
    <div>
      <h2>WordOutput:</h2>
      {wordData[0].meanings.map((meaning) => (
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
