import RepetitionChecker from '@/features/repetition/repetitionChecker/RepetitionChecker';
import { useGetTodayRepetitionsQuery } from '@/features/repetition/repetitionApiSlice';

export default function UserRepetitions() {
  const { data: repetitions, isSuccess } = useGetTodayRepetitionsQuery();

  return isSuccess ? <RepetitionChecker repetitions={repetitions} /> : <div>Loading...</div>;
}
