import Antonyms from './Antonyms/Antonyms';
import Definitions from './Definitions/Definitions';
import Synonyms from './Synonyms/Synonyms';

type Props = {
  meanings: Meaning[],
};

export default function WordMeaningsList({ meanings }: Props) {
  return (
    <div>
      {meanings.map((meaning) => (
        <div key={meaning?.definitions[0]?.definition}>
          <h2>{meaning.partOfSpeech}</h2>
          <Definitions definitions={meaning.definitions} />
          <Synonyms synonyms={meaning.synonyms} />
          <Antonyms antonyms={meaning.antonyms} />
        </div>
      ))}
    </div>
  );
}
