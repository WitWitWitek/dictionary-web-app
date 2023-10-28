import { useGetAllRepetitionsQuery } from '@/features/repetition/repetitionApiSlice';
import RepetitionDetails from '@/features/repetition/repetitionDetails/RepetitionDetails';

export default function Dashboard() {
  const { data: repetitions, isLoading } = useGetAllRepetitionsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Twoje powtórki:</h1>
      <div>
        {repetitions &&
          repetitions.map((repetition) => <RepetitionDetails key={repetition.id} repetition={repetition} />)}
      </div>
    </div>
  );
}
