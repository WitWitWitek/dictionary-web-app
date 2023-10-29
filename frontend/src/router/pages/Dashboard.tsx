import { useGetAllRepetitionsQuery } from '@/features/repetition/repetitionApiSlice';
import RepetitionDetails from '@/features/repetition/repetitionDetails/RepetitionDetails';

export default function Dashboard() {
  const { data: repetitions, isLoading } = useGetAllRepetitionsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Your repetitions:</h1>
      <div className="dashboard__container">
        {repetitions &&
          repetitions.map((repetition) => <RepetitionDetails key={repetition.id} repetition={repetition} />)}
      </div>
    </div>
  );
}
