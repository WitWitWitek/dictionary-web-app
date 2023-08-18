import RepetitionChecker from '../../features/repetition/RepetitionChecker';
import { useGetAllRepetitionsQuery } from '../../features/repetition/repetitionApiSlice';

export default function UserRepetitions() {
  const { data: repetitions, isSuccess } = useGetAllRepetitionsQuery();

  return isSuccess ? <RepetitionChecker repetitions={repetitions} /> : <div>Loading...</div>;
}
