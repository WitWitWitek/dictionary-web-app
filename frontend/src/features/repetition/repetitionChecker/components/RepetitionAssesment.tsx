type Props = {
  currentRepetiton: string;
  userInputSentence: string;
};

export default function RepetitionAssesment({ userInputSentence, currentRepetiton }: Props) {
  const currentInputSplitted = userInputSentence.split('');
  const currentRepetitionSplitted = currentRepetiton.split('');
  return (
    <div>
      {currentRepetitionSplitted.map((char, index) =>
        char === currentInputSplitted[index] ? (
          <span style={{ color: 'green' }} key={char + Math.random()}>
            {char}
          </span>
        ) : (
          <span style={{ color: 'red' }} key={char + Math.random()}>
            {currentInputSplitted[index] ? currentInputSplitted[index] : char}
          </span>
        ),
      )}
    </div>
  );
}
