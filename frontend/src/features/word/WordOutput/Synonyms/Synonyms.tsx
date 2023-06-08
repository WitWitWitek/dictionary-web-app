type Props = {
  synonyms: Synonym[]
};

export default function Synonyms({ synonyms }: Props) {
  if (synonyms.length === 0) return null;
  return (
    <div>
      <h3>{`Synonym${synonyms.length > 1 ? 's' : ''}:`}</h3>
      <ul>
        {synonyms.map((synonym) => (
          <span key={`${synonym}${Math.random()}`}>
            {synonym}
            {', '}
          </span>
        ))}
      </ul>
    </div>
  );
}
