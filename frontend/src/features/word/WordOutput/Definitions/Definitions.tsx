import SaveExampleButton from '@/components/ui/SaveExampleButton';
import { Definition } from '@/types';

type Props = {
  definitions: Definition[];
};

export default function Definitions({ definitions }: Props) {
  if (definitions.length === 0) return null;
  return (
    <>
      <h3 className="meanings__heading">{`Definition${definitions.length > 1 ? 's' : ''}:`}</h3>
      <ul className="meanings__list" key={`${Math.random()}${definitions[0]?.definition}`}>
        {definitions.map((definition) => (
          <li className="meanings__list-item" key={Math.random()}>
            <p className="meanings__definition-text">{definition.definition}</p>
            {definition.example && (
              <p className="meanings__definition-example">
                {definition.example} <SaveExampleButton exampleContent={definition.example} />
              </p>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
