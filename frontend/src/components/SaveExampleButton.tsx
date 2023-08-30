import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { usePostRepetitionMutation } from '@/features/repetition/repetitionApiSlice';

type Props = {
  exampleContent: string;
};

export default function SaveExampleButton({ exampleContent }: Props) {
  const user = useSelector(selectCurrentUser);
  const [postRepetition] = usePostRepetitionMutation();

  const postRepetitionHandler = async () => {
    await postRepetition({ content: exampleContent });
  };

  if (!user) return null;

  return (
    <button type="button" onClick={postRepetitionHandler}>
      save
    </button>
  );
}
