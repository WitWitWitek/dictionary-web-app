import { useSelector } from 'react-redux';
import { selectCurrentToken } from '@/features/auth/authSlice';
import { usePostRepetitionMutation } from '@/features/repetition/repetitionApiSlice';

type Props = {
  exampleContent: string;
};

export default function SaveExampleButton({ exampleContent }: Props) {
  const userToken = useSelector(selectCurrentToken);
  const [postRepetition] = usePostRepetitionMutation();

  const postRepetitionHandler = async () => {
    await postRepetition({ content: exampleContent });
  };

  if (!userToken) return null;
  return (
    <button type="button" onClick={postRepetitionHandler}>
      save
    </button>
  );
}
