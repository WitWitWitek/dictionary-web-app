import { Link } from 'react-router-dom';
import useRepetionChecker from '../../hooks/useRepetionChecker';

type Props = {
  repetitions: Repetition[];
};

export default function RepetitionChecker({ repetitions }: Props) {
  const {
    userInputSentence,
    setUserInputSentence,
    currentRepetition,
    result,
    checkRepetition,
    checkHint,
    repetitionsArrayIndex,
    isGradeContainerOpen,
    assessResult,
    isExcerciseFinished,
  } = useRepetionChecker(repetitions);

  if (!repetitions || repetitions.length === 0) {
    return (
      <div>
        <p>The user hasn&apos;t chosen any repetition yet...</p>
        <Link to="/dictionary">Find interesting sentence.</Link>
      </div>
    );
  }

  if (isExcerciseFinished) {
    return <p>good job.</p>;
  }

  return (
    <div>
      <p>{`${repetitionsArrayIndex + 1}/${repetitions.length}`}</p>
      <p>{currentRepetition}</p>
      <textarea
        value={userInputSentence}
        onChange={(e) => setUserInputSentence(e.target.value)}
        placeholder="Type a sentence..."
      />
      <div>
        {!isGradeContainerOpen ? (
          <>
            <button onClick={checkHint} type="button">
              Check Hint
            </button>
            <button onClick={checkRepetition} type="button">
              Check Repetition
            </button>
          </>
        ) : (
          <>
            <button onClick={assessResult} type="button">
              Bad
            </button>
            <button onClick={assessResult} type="button">
              Mediocrely
            </button>
            <button onClick={assessResult} type="button">
              Excellent
            </button>
          </>
        )}
      </div>
      <p>{result}</p>
    </div>
  );
}
