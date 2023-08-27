import { Synonym } from '../../../../types';

type Props = {
  antonyms: Synonym[];
};

export default function Antonyms({ antonyms }: Props) {
  if (antonyms.length === 0) return null;
  return (
    <div>
      <h3 className="meanings__synonym-heading">{`Antonym${antonyms.length > 1 ? 's' : ''}:`}</h3>
      <ul>
        {antonyms.map((antonym) => (
          <span key={`${antonym}${Math.random()}`}>
            {antonym}
            {', '}
          </span>
        ))}
      </ul>
    </div>
  );
}
