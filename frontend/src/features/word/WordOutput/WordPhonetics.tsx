import getAudioUrl from '../../../lib/getAudioUrl';

type PhoneticsProps = {
  phonetics: Phonetic[]
};

export default function WordPhonetics({ phonetics }: PhoneticsProps) {
  const audioUrl = getAudioUrl(phonetics);

  if (!audioUrl) return null;

  const audio = new Audio(audioUrl);

  return <button onClick={() => audio.play()} type="button">Listen</button>;
}
