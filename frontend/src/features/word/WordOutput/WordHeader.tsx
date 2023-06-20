import WordPhonetics from './WordPhonetics';

type Props = {
  title: string,
  phonetic: string,
  phonetics: Phonetic[]
};

export default function WordHeader({ title, phonetic, phonetics }: Props) {
  return (
    <div className="word-header">
      <h1 className="word-header__heading">{title}</h1>
      <p className="word-header__pronunciation">{phonetic}</p>
      <WordPhonetics phonetics={phonetics} />
    </div>
  );
}
