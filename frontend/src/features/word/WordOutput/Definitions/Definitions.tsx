type Props = {
  definitions: Definition[]
};

export default function Definitions({ definitions }: Props) {
  if (definitions.length === 0) return null;
  return (
    <div>
      <h3>{`Definition${definitions.length > 1 ? 's' : ''}:`}</h3>
      <ul key={`${Math.random()}${definitions[0]?.definition}`}>
        {definitions.map(
          (definition) => (
            <li key={Math.random()}>
              <p><i>{definition.definition}</i></p>
              {definition.example && <p>{definition.example}</p>}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
