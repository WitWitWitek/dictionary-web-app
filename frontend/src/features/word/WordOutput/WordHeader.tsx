import WordPhonetics from './WordPhonetics';

type Props = {
  title: string,
  phonetic: string,
  phonetics: Phonetic[]
};

export default function WordHeader({ title, phonetic, phonetics }: Props) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{phonetic}</p>
      <WordPhonetics phonetics={phonetics} />
    </div>
  );
}
