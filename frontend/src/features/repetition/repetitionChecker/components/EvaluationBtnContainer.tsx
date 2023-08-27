import React from 'react';
import { MarkValue } from '../../../../types';

type Props = {
  isGradeContainerOpen: boolean;
  checkHint: () => void;
  checkRepetition: () => void;
  assessResult: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  percentageAssessment: number;
};

const assignMarkHandler = (mark: number): string => {
  switch (true) {
    case mark < 0.25:
      return MarkValue.Bad;
    case mark > 0.75:
      return MarkValue.Excellent;
    default:
      return MarkValue.Mediocrely;
  }
};

export default function EvaluationBtnContainer({
  isGradeContainerOpen,
  assessResult,
  percentageAssessment,
  checkHint,
  checkRepetition,
}: Props) {
  const sugesstedMark = assignMarkHandler(percentageAssessment);

  return (
    <div>
      {!isGradeContainerOpen ? (
        <>
          <button onClick={checkHint} type="button">
            <strong>Check Hint</strong>
            <p>
              <i>press arrow right</i>
            </p>
          </button>
          <button onClick={checkRepetition} type="button">
            <strong>Check Repetition</strong>
            <p>
              <i>press enter</i>
            </p>
          </button>
        </>
      ) : (
        <>
          {[MarkValue.Bad, MarkValue.Mediocrely, MarkValue.Excellent].map((mark) => (
            <button
              onClick={assessResult}
              type="button"
              key={mark}
              style={{ borderColor: `${sugesstedMark === mark ? 'yellow' : 'solid'}` }}
            >
              {sugesstedMark === mark ? <strong>{mark}</strong> : mark}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
