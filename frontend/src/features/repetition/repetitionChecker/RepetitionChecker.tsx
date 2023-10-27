import { Link } from 'react-router-dom';
import useRepetionChecker from '@/hooks/useRepetionChecker';
import EvaluationBtnContainer from './components/EvaluationBtnContainer';
import ExcerciseFinishedView from './components/ExcerciseFinishedView';
import { Repetition } from '@/types';
import RepetitionProgressBar from './components/RepetitionProgressBar';
import RepetitionContent from './components/RepetitionContent';
import ExcerciseFiled from './components/ExcerciseFiled';
import RepetitionEmptyList from './components/RepetitionEmptyList';

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

  if (!repetitions || repetitions.length === 0) {
    return <RepetitionEmptyList />;
  }

  if (isExcerciseFinished) {
    return <ExcerciseFinishedView />;
  }

  return (
    <div className="repetition">
      <h1>Practice repetitions:</h1>
      <RepetitionProgressBar currentRepetition={currentRepetitionIndex} allRepetitions={repetitions.length} />
      <RepetitionContent currentRepetition={currentRepetition} />
      <ExcerciseFiled
        isGradeContainerOpen={isGradeContainerOpen}
        userInputSentence={userInputSentence}
        setUserInputSentence={setUserInputSentence}
        currentRepetition={currentRepetition}
        checkRepetition={checkRepetition}
        checkHint={checkHint}
      />
      <EvaluationBtnContainer
        repetition={repetitions[currentRepetitionIndex]}
        isGradeContainerOpen={isGradeContainerOpen}
        checkHint={checkHint}
        checkRepetition={checkRepetition}
        assessResult={assessResult}
        percentageAssessment={percentageAssessment}
      />
      <p className="repetition__result">{result}</p>
    </div>
  );
}
