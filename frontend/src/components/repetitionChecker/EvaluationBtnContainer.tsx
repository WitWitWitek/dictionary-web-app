import React from 'react';

type Props = {
  isGradeContainerOpen: boolean;
  checkHint: () => void;
  checkRepetition: () => void;
  assessResult: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function EvaluationBtnContainer({
  isGradeContainerOpen,
  assessResult,
  checkHint,
  checkRepetition,
}: Props) {
  return (
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
          {['Bad', 'Mediocrely', 'Excellent'].map((mark) => (
            <button onClick={assessResult} type="button" key={mark}>
              {mark}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
