import RepetitionChecker from '../../features/repetition/RepetitionChecker';
import { useGetAllRepetitionsQuery } from '../../features/word/wordApiSlice';

export default function UserRepetitions() {
  const { data: repetitions } = useGetAllRepetitionsQuery();

  if (!repetitions) return <div>error</div>;
  return <RepetitionChecker repetitions={repetitions} />;
}
