type Props = {
  meanings: Meaning[],
};

export default function WordMeanings({ meanings }: Props) {
  return (
    <div>
      {meanings.map((meaning) => (
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
