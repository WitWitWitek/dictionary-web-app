import { useSelector } from 'react-redux';
import { FaPlus, FaCheck } from 'react-icons/fa6';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { usePostRepetitionMutation } from '@/features/repetition/repetitionApiSlice';

type Props = {
  exampleContent: string;
  currentWordQuery: string;
};

export default function SaveExampleButton({ exampleContent, currentWordQuery }: Props) {
  const user = useSelector(selectCurrentUser);
  const [postRepetition, { isSuccess }] = usePostRepetitionMutation();
  const postRepetitionHandler = async () => {
    await postRepetition({ content: exampleContent, word: currentWordQuery });
  };

  if (!user) return null;

  return (
    <button
      type="button"
      className="meanings__save-btn"
      onClick={postRepetitionHandler}
      title="Add repetition to collection."
      disabled={isSuccess}
    >
      {!isSuccess ? <FaPlus /> : <FaCheck />}
    </button>
  );
}
