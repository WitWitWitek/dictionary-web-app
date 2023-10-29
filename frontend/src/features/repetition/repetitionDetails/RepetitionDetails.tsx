import { FaTrashCan } from 'react-icons/fa6';
import { Repetition } from '@/types';
import { useDeleteRepetitionMutation } from '@/features/repetition/repetitionApiSlice';
import dateHandler from '@/lib/dateHandler';

type Props = {
  repetition: Repetition;
};

export default function RepetitionDetails({ repetition }: Props) {
  const [deleteRepetitionById] = useDeleteRepetitionMutation();
  const deleteRepetiotonHandler = async (id: string) => {
    await deleteRepetitionById({ id });
  };

  const scoreProgress = (Number(repetition.averageScore) / 5) * 100;
  return (
    <div className="repetition-details">
      <button
        className="repetition-details__delete-btn"
        onClick={() => deleteRepetiotonHandler(repetition.id)}
        type="button"
        title="Remove repetition from your collection."
      >
        <FaTrashCan />
      </button>
      <p>{repetition.content}</p>
      <p>Added: {dateHandler(repetition.createdAt)}</p>
      <p>Your average score: {repetition.averageScore ?? "The repetition hasn't been practiced yet."}</p>
      <div className="repetition-details__progress-container">
        <div className="repetition-details__progress-outer" />
      </div>
      <p>Last time repated: {dateHandler(repetition.updatedAt)}</p>

      <div className="progress-bar">
        <div className="progress-bar__container">
          <div className="progress-bar__line" style={{ width: `${scoreProgress}%` }} />
        </div>
      </div>
    </div>
  );
}
