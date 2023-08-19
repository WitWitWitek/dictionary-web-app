import { Link } from 'react-router-dom';
import useRepetionChecker from '../../hooks/useRepetionChecker';

type Props = {
  repetitions: Repetition[];
};

export default function RepetitionChecker({ repetitions }: Props) {
  const {
    inputSentence,
    setInputSentence,
    currentRepetition,
    result,
    checkRepetition,
    checkHint,
    repetitionsArrayIndex,
  } = useRepetionChecker(repetitions);

  if (!repetitions || repetitions.length === 0) {
    return (
      <div>
        <p>The user hasn&apos;t chosen any repetition yet...</p>
        <Link to="/dictionary">Find interesting sentence.</Link>
      </div>
    );
  }

  return (
    <div>
      <p>{`${repetitionsArrayIndex + 1}/${repetitions.length}`}</p>
      <p>{currentRepetition}</p>
      <textarea
        value={inputSentence}
        onChange={(e) => setInputSentence(e.target.value)}
        placeholder="Type a sentence..."
      />
      <div>
        <button onClick={checkHint} type="button">
          Check Hint
        </button>
        <button onClick={checkRepetition} type="button">
          Check Repetition
        </button>
      </div>
      <p>{result}</p>
    </div>
  );
}
