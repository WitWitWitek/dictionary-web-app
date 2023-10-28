import { FaTrashCan } from 'react-icons/fa6';
import { useDeleteRepetitionMutation, useGetAllRepetitionsQuery } from '@/features/repetition/repetitionApiSlice';

const dateHandler = (publicationDate: string) => {
  const dateObj = new Date(publicationDate);
  return Intl.DateTimeFormat('en-EN', { dateStyle: 'medium' }).format(dateObj);
};

export default function Dashboard() {
  const { data: repetitions, isLoading } = useGetAllRepetitionsQuery();
  const [deleteRepetitionById] = useDeleteRepetitionMutation();

  const deleteRepetiotonHandler = async (id: string) => {
    await deleteRepetitionById({ id });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Twoje powtórki:</h1>
      <table>
        <thead>
          <tr>
            <th>Content</th>
            <th>Average score</th>
            <th>Last repetition date</th>
          </tr>
        </thead>
        <tbody>
          {repetitions &&
            repetitions.map((repetition) => (
              <tr key={repetition.id}>
                <td>{repetition.content}</td>
                <td>{repetition.averageScore ?? 'No repeated yet.'}</td>
                <td>{dateHandler(repetition.updatedAt)}</td>
                <td>
                  <button onClick={() => deleteRepetiotonHandler(repetition.id)} type="button">
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
