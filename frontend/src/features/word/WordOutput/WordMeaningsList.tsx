import Antonyms from './Antonyms/Antonyms';
import Definitions from './Definitions/Definitions';
import Synonyms from './Synonyms/Synonyms';
import { Meaning } from '@/types';

type Props = {
  meanings: Meaning[];
};

export default function WordMeaningsList({ meanings }: Props) {
  return (
    <div>
      {meanings.map((meaning) => (
        <div className="meanings" key={meaning?.definitions[0]?.definition}>
          <h2 className="meanings__part-of-speech">{meaning.partOfSpeech}</h2>
          <Definitions definitions={meaning.definitions} />
          <Synonyms synonyms={meaning.synonyms} />
          <Antonyms antonyms={meaning.antonyms} />
        </div>
      ))}
    </div>
  );
}
