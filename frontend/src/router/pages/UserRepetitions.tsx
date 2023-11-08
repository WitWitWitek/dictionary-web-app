import RepetitionChecker from '@/features/repetition/repetitionChecker/RepetitionChecker';
import { useGetTodayRepetitionsQuery } from '@/features/repetition/repetitionApiSlice';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import RepetitionEmptyList from '@/features/repetition/repetitionChecker/components/RepetitionEmptyList';

export default function UserRepetitions() {
  const { data: repetitions, isSuccess, isLoading } = useGetTodayRepetitionsQuery();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!repetitions || repetitions.length === 0) {
    return <RepetitionEmptyList />;
  }

  return isSuccess && <RepetitionChecker repetitions={repetitions} />;
}
