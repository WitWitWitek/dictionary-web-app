type Props = {
  exampleContent: string;
};

export default function SaveExampleButton({ exampleContent }: Props) {
  const postRepetition = async () => {
    await fetch('http://localhost:3500/repetitions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: exampleContent }),
    });
  };
  return (
    <button type="button" onClick={postRepetition}>
      save
    </button>
  );
}
