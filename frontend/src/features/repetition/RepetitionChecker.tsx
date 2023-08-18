import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  repetitions: Repetition[];
};

export default function RepetitionChecker({ repetitions }: Props) {
  const [repetitionsArrayIndex, setRepetitionsArrayIndex] = useState<number>(0);
  const [currentRepetition, setCurrentRepetition] = useState<string>('');
  const [currentRepetitionIndex, setCurrentRepetitionIndex] = useState<number>(0);
  const [inputSentence, setInputSentence] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const checkRepetition = () => {
    const cleanedInput = inputSentence.trim().toLowerCase();
    if (cleanedInput === currentRepetition.toLowerCase()) {
      setResult("Correct! It's a repetition.");
      const futureIndex = repetitionsArrayIndex + 1;
      const lastIndex = repetitions.length - 1;
      const canBeIncremented = futureIndex <= lastIndex;
      setRepetitionsArrayIndex((prev) => (canBeIncremented ? prev + 1 : 0));
      setInputSentence(() => '');
      setCurrentRepetitionIndex(() => 0);
    } else {
      setResult("Try again. It's not a repetition.");
    }
  };

  const checkHint = () => {
    setInputSentence((prev) => prev + currentRepetition[currentRepetitionIndex]);
    setCurrentRepetitionIndex((index) => index + 1);
  };

  useEffect(() => {
    if (repetitions.length) setCurrentRepetition(() => repetitions[repetitionsArrayIndex].content);
  }, [repetitionsArrayIndex]);

  if (!repetitions || repetitions.length === 0) {
    return (
      <div>
        <p>The user hasn&apos;t chosen any repetition yet...</p>
        <Link to="/dictionary">Find interesting sentence.</Link>
      </div>
    );
  }

  return (
    <div>
      <p>{`${repetitionsArrayIndex + 1}/${repetitions.length}`}</p>
      <p>{currentRepetition}</p>
      <textarea
        value={inputSentence}
        onChange={(e) => setInputSentence(e.target.value)}
        placeholder="Type a sentence..."
      />
      <div>
        <button onClick={checkHint} type="button">
          Check Hint
        </button>
        <button onClick={checkRepetition} type="button">
          Check Repetition
        </button>
      </div>
      <p>{result}</p>
    </div>
  );
}
