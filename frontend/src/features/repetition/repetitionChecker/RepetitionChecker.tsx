import { KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import useRepetionChecker from '../../../hooks/useRepetionChecker';
import EvaluationBtnContainer from './components/EvaluationBtnContainer';
import ExcerciseFinishedView from './components/ExcerciseFinishedView';
import RepetitionAssesment from './components/RepetitionAssesment';

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
    percentageAssessment,
    isGradeContainerOpen,
    isExcerciseFinished,
  } = useRepetionChecker(repetitions);

  const onKeyEventHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') checkRepetition();
    if (e.key === 'ArrowRight') checkHint();
  };

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
      {!isGradeContainerOpen ? (
        <textarea
          value={userInputSentence}
          onChange={(e) => setUserInputSentence(e.target.value)}
          placeholder="Type a sentence..."
          onKeyDown={onKeyEventHandler}
        />
      ) : (
        <RepetitionAssesment userInputSentence={userInputSentence} currentRepetiton={currentRepetition} />
      )}
      <EvaluationBtnContainer
        isGradeContainerOpen={isGradeContainerOpen}
        checkHint={checkHint}
        checkRepetition={checkRepetition}
        assessResult={assessResult}
        percentageAssessment={percentageAssessment}
      />
      <p>{result}</p>
    </div>
  );
}
