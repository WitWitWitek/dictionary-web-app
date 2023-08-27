import PlayIcon from '../../../assets/PlayIcon';
import getAudioUrl from '../../../lib/getAudioUrl';
import { Phonetic } from '../../../types';

type PhoneticsProps = {
  phonetics: Phonetic[];
};

export default function WordPhonetics({ phonetics }: PhoneticsProps) {
  const audioUrl = getAudioUrl(phonetics);

  if (!audioUrl) return null;

  const audio = new Audio(audioUrl);

  return (
    <button className="word-header__audio play-button" onClick={() => audio.play()} type="button">
      <PlayIcon />
    </button>
  );
}
