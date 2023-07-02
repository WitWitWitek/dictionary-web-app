import { useGetAllRepetitionsQuery } from '../../features/word/wordApiSlice';

export default function UserRepetitions() {
  const { data: repetitions } = useGetAllRepetitionsQuery();

  if (!repetitions) return <div>error</div>;
  return (
    <table>
      <thead>
        <tr>
          <th>Content</th>
          <th>createdAt</th>
        </tr>
      </thead>
      <tbody>
        {repetitions.map((repetition) => (
          <tr key={repetition.id}>
            <td>{repetition.content}</td>
            <td>
              {(() => {
                const date = new Date(repetition.createdAt);
                return new Intl.DateTimeFormat('pl-PL', { dateStyle: 'full' }).format(date);
              })()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
