import { MarkValue, Repetition } from '@/types';
import { useAsssessRepetitionMutation } from '../../repetitionApiSlice';
import assignMarkHandler from '@/lib/assignMarkHandler';

type Props = {
  repetition: Repetition;
  isGradeContainerOpen: boolean;
  checkHint: () => void;
  checkRepetition: () => void;
  assessResult: () => void;
  percentageAssessment: number;
};

export default function EvaluationBtnContainer({
  repetition,
  isGradeContainerOpen,
  assessResult,
  percentageAssessment,
  checkHint,
  checkRepetition,
}: Props) {
  const sugesstedMark = assignMarkHandler(percentageAssessment);
  const [assessRepetition] = useAsssessRepetitionMutation();

  const assessRepetitionHandler = async (mark: MarkValue): Promise<void> => {
    let score: 1 | 3 | 5;
    assessResult();
    if (mark === MarkValue.Bad) {
      score = 1;
    } else if (mark === MarkValue.Mediocrely) {
      score = 3;
    } else {
      score = 5;
    }
    await assessRepetition({ id: repetition.id, repetitionScore: score });
  };

  return (
    <div className="repetition-checker__evaluation">
      {!isGradeContainerOpen ? (
        <>
          <button
            className="repetition-checker__evaluation-btn repetition-checker__evaluation-btn--outline"
            onClick={checkHint}
            type="button"
          >
            <strong>Check Hint</strong>
            <p>
              <i>press arrow right</i>
            </p>
          </button>
          <button
            className="repetition-checker__evaluation-btn repetition-checker__evaluation-btn--primary"
            onClick={checkRepetition}
            type="button"
          >
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
              className={`repetition-checker__evaluation-btn repetition-checker__evaluation-btn--${mark.toLowerCase()} ${
                sugesstedMark === mark ? 'repetition-checker__evaluation-btn--active' : ''
              }`}
              onClick={() => assessRepetitionHandler(mark)}
              type="button"
              key={mark}
            >
              {sugesstedMark === mark ? <strong>{mark}</strong> : mark}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
