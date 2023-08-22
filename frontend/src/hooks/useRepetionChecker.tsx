import { useState, useEffect, MouseEvent } from 'react';

const whatIndexShouldBe = (userInput: string, repetitonToCheck: string): number => {
  let requiredIndex = 0;
  const splitedRepetition = repetitonToCheck.split('');
  const splitedInputSentence = userInput.split('');
  splitedInputSentence.forEach((char, index) => {
    if (char === splitedRepetition[index]) {
      requiredIndex = index + 1;
    } else {
      requiredIndex = 0;
    }
  });
  return requiredIndex;
};

const useRepetionChecker = (repetitions: Repetition[]) => {
  const [repetitionsArrayIndex, setRepetitionsArrayIndex] = useState<number>(0);
  const [currentRepetition, setCurrentRepetition] = useState<string>('');
  const [currentRepetitionIndex, setCurrentRepetitionIndex] = useState<number>(0);
  const [inputSentence, setInputSentence] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isMarkContainerOpen, setIsMarkContainerOpen] = useState<boolean>(false);

  const checkRepetition = () => {
    const cleanedInput = inputSentence.trim().toLowerCase();
    if (cleanedInput === currentRepetition.toLowerCase()) {
      setResult("Correct! It's a repetition.");
      setInputSentence(() => '');
      setCurrentRepetitionIndex(() => 0);
    } else {
      setResult("Try again. It's not a repetition.");
    }
    setIsMarkContainerOpen(() => true);
  };

  const checkHint = () => {
    const canBeIncremented = currentRepetition.length >= currentRepetitionIndex + 1;
    if (currentRepetitionIndex !== 0) {
      setInputSentence((prev) => (canBeIncremented ? prev + currentRepetition[currentRepetitionIndex] : prev));
    } else {
      setInputSentence(() => currentRepetition[currentRepetitionIndex]);
    }
    setCurrentRepetitionIndex((index) => (canBeIncremented ? index + 1 : index));
  };

  const assesResult = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.textContent);

    const futureIndex = repetitionsArrayIndex + 1;
    const lastIndex = repetitions.length - 1;
    const canBeIncremented = futureIndex <= lastIndex;
    setRepetitionsArrayIndex((prev) => (canBeIncremented ? prev + 1 : 0));
    setIsMarkContainerOpen(() => false);
  };

  useEffect(() => {
    const expectedIndexOfHint = whatIndexShouldBe(inputSentence, currentRepetition);
    setCurrentRepetitionIndex(() => expectedIndexOfHint);
  }, [inputSentence, currentRepetition]);

  useEffect(() => {
    if (repetitions.length) {
      setCurrentRepetition(() => repetitions[repetitionsArrayIndex].content);
    }
  }, [repetitionsArrayIndex]);

  return {
    result,
    inputSentence,
    setInputSentence,
    checkHint,
    checkRepetition,
    currentRepetition,
    repetitionsArrayIndex,
    isMarkContainerOpen,
    assesResult,
  };
};

export default useRepetionChecker;
