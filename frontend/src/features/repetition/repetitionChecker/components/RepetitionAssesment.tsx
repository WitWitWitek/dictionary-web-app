type Props = {
  currentRepetiton: string;
  userInputSentence: string;
};

export default function RepetitionAssesment({ userInputSentence, currentRepetiton }: Props) {
  const currentInputSplitted = userInputSentence.split('');
  const currentRepetitionSplitted = currentRepetiton.split('');
  return (
    <div className="repetition-checker__assesment">
      {currentRepetitionSplitted.map((char, index) =>
        char === currentInputSplitted[index] ? (
          <span className="repetition-checker__assesment-char-correct" key={char + Math.random()}>
            {char}
          </span>
        ) : (
          <span className="repetition-checker__assesment-char-wrong" key={char + Math.random()}>
            {currentInputSplitted[index] ? currentInputSplitted[index] : char}
          </span>
        ),
      )}
    </div>
  );
}
