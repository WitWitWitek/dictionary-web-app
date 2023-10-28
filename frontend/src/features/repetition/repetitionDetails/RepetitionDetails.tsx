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
  return (
    <div>
      <p>{repetition.content}</p>
      <button onClick={() => deleteRepetiotonHandler(repetition.id)} type="button">
        <FaTrashCan />
      </button>
      <p>Added: {dateHandler(repetition.createdAt)}</p>
      <p>Your average score: {repetition.averageScore ?? "The repetition hasn't been practiced yet."}</p>
      <p>Last time repated: {dateHandler(repetition.updatedAt)}</p>
    </div>
  );
}
