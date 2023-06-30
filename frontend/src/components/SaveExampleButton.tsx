import { usePostRepetitionMutation } from '../features/word/wordApiSlice';

type Props = {
  exampleContent: string;
};

export default function SaveExampleButton({ exampleContent }: Props) {
  const [postRepetition] = usePostRepetitionMutation();

  const postRepetitionHandler = async () => {
    await postRepetition({ content: exampleContent });
  };

  return (
    <button type="button" onClick={postRepetitionHandler}>
      save
    </button>
  );
}
