import { Link } from 'react-router-dom';
import useRepetionChecker from '../../hooks/useRepetionChecker';
import EvaluationBtnContainer from '../../components/repetitionChecker/EvaluationBtnContainer';
import ExcerciseFinishedView from '../../components/repetitionChecker/ExcerciseFinishedView';
import RepetitionAssesment from '../../components/repetitionChecker/RepetitionAssesment';

type Props = {
  repetitions: Repetition[];
};

export default function RepetitionChecker({ repetitions }: Props) {
  const {
    userInputSentence,
    setUserInputSentence,
    currentRepetition,
    currentRepetitionIndex,
    result,
    checkHint,
    checkRepetition,
    assessResult,
    isGradeContainerOpen,
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
    return <ExcerciseFinishedView />;
  }

  return (
    <div>
      <p>{`${currentRepetitionIndex + 1}/${repetitions.length}`}</p>
      <p>{currentRepetition}</p>
      {!isGradeContainerOpen && (
        <textarea
          value={userInputSentence}
          onChange={(e) => setUserInputSentence(e.target.value)}
          placeholder="Type a sentence..."
        />
      )}
      {isGradeContainerOpen && (
        <RepetitionAssesment userInputSentence={userInputSentence} currentRepetiton={currentRepetition} />
      )}
      <EvaluationBtnContainer
        isGradeContainerOpen={isGradeContainerOpen}
        checkHint={checkHint}
        checkRepetition={checkRepetition}
        assessResult={assessResult}
      />
      <p>{result}</p>
    </div>
  );
}
