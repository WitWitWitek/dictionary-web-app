import { useGetAllRepetitionsQuery } from '@/features/repetition/repetitionApiSlice';

const dateHandler = (publicationDate: string) => {
  const dateObj = new Date(publicationDate);
  return Intl.DateTimeFormat('en-EN', { dateStyle: 'medium' }).format(dateObj);
};

export default function Dashboard() {
  const { data: repetitions, isLoading } = useGetAllRepetitionsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Twoje powtórki</h1>
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
                <td>{repetition.averageScore}</td>
                <td>{dateHandler(repetition.updatedAt)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
