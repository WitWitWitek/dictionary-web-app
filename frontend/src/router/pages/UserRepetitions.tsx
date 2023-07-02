import { useGetAllRepetitionsQuery } from '../../features/word/wordApiSlice';

export default function UserRepetitions() {
  const { data: repetitions } = useGetAllRepetitionsQuery('');
  if (!repetitions) return <div>error</div>;
  return (
    <ul>
      {repetitions.map((repetition) => (
        <li key={repetition.id}>{repetition.content}</li>
      ))}
    </ul>
  );
}
