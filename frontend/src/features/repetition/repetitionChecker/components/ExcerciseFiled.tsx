import { KeyboardEvent } from 'react';
import RepetitionAssesment from './RepetitionAssesment';

type Props = {
  isGradeContainerOpen: boolean;
  userInputSentence: string;
  setUserInputSentence: (value: React.SetStateAction<string>) => void;
  currentRepetition: string;
  checkRepetition: () => void;
  checkHint: () => void;
};

export default function ExcerciseFiled({
  isGradeContainerOpen,
  userInputSentence,
  setUserInputSentence,
  checkRepetition,
  checkHint,
  currentRepetition,
}: Props) {
  const onKeyEventHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') checkRepetition();
    if (e.key === 'ArrowRight') checkHint();
  };

  return (
    <div className="repetition-checker__excercise">
      <h3>Your repetition:</h3>
      <div className="repetition-checker__excercise-container">
        {!isGradeContainerOpen ? (
          <textarea
            className="repetition-checker__textarea"
            value={userInputSentence}
            onChange={(e) => setUserInputSentence(e.target.value)}
            placeholder="Type a text of the repetition"
            onKeyDown={onKeyEventHandler}
          />
        ) : (
          <RepetitionAssesment userInputSentence={userInputSentence} currentRepetiton={currentRepetition} />
        )}
      </div>
    </div>
  );
}
