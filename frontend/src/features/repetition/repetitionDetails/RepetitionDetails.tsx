import { FaTrashCan } from 'react-icons/fa6';
import { Repetition } from '@/types';
import { useDeleteRepetitionMutation } from '@/features/repetition/repetitionApiSlice';
import dateHandler from '@/lib/dateHandler';
import assignMarkHandler from '@/lib/assignMarkHandler';

type Props = {
  repetition: Repetition;
};

export default function RepetitionDetails({ repetition }: Props) {
  const [deleteRepetitionById] = useDeleteRepetitionMutation();
  const deleteRepetiotonHandler = async (id: string) => {
    await deleteRepetitionById({ id });
  };

  const scoreProgress = Number(repetition.averageScore) / 5;
  return (
    <div className="repetition-details">
      <div className="repetition-details__controls">
        <button
          className="repetition-details__delete-btn"
          onClick={() => deleteRepetiotonHandler(repetition.id)}
          type="button"
          title="Remove repetition from your collection."
        >
          <FaTrashCan />
        </button>
      </div>
      <div className="repetition-details__container">
        <div className="repetition-details__content">{repetition.content}</div>
        <p>
          Added: <span>{dateHandler(repetition.createdAt)}</span>
        </p>
        <div className="repetition-details__progress-container">
          <div className="repetition-details__progress-outer" />
        </div>
        <p>
          Last time repated: <span>{dateHandler(repetition.updatedAt)}</span>
        </p>
        <p>
          Your average score: <span>{repetition.averageScore ?? "The repetition hasn't been practiced yet."}</span>
        </p>
        <div className="progress-bar">
          <div className="progress-bar__container">
            <div
              className={`progress-bar__line--${assignMarkHandler(scoreProgress).toLowerCase()}`}
              style={{ width: `${scoreProgress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
