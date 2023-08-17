import { useState, useEffect } from 'react';

type Props = {
  repetitions: Repetition[];
};

export default function RepetitionChecker({ repetitions }: Props) {
  const [repetitionsArrayIndex, setRepetitionsArrayIndex] = useState<number>(0);
  const [currentRepetition, setCurrentRepetition] = useState<string>(repetitions[repetitionsArrayIndex].content);

  const [inputSentence, setInputSentence] = useState('');
  const [result, setResult] = useState<string>('');

  const targetPhrase = currentRepetition;

  const checkRepetition = () => {
    const cleanedInput = inputSentence.trim().toLowerCase();
    if (cleanedInput === targetPhrase.toLowerCase()) {
      setResult("Correct! It's a repetition.");
      const futureIndex = repetitionsArrayIndex + 1;
      const lastIndex = repetitions.length - 1;
      const canBeIncremented = futureIndex <= lastIndex;
      setRepetitionsArrayIndex((prev) => (canBeIncremented ? prev + 1 : 0));
    } else {
      setResult("Try again. It's not a repetition.");
    }
  };

  useEffect(() => {
    setCurrentRepetition(() => repetitions[repetitionsArrayIndex].content);
  }, [repetitionsArrayIndex]);

  return (
    <div>
      <p>{`${repetitionsArrayIndex + 1}/${repetitions.length}`}</p>
      <p>{currentRepetition}</p>
      <input
        type="text"
        value={inputSentence}
        onChange={(e) => setInputSentence(e.target.value)}
        placeholder="Type a sentence..."
      />
      <button onClick={checkRepetition} type="button">
        Check Repetition
      </button>
      <p>{result}</p>
    </div>
  );
}
