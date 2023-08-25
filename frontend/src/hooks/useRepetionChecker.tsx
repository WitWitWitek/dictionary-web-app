import { useState, useEffect, MouseEvent } from 'react';

const whatIndexShouldBe = (userInput: string, repetitonToCheck: string): number => {
  let currentRepetitionStringIndex = 0;
  const splitedRepetition = repetitonToCheck.split('');
  const splitedInputSentence = userInput.split('');
  splitedInputSentence.forEach((char, index) => {
    if (char === splitedRepetition[index]) {
      currentRepetitionStringIndex = index + 1;
    } else {
      currentRepetitionStringIndex = 0;
    }
  });
  return currentRepetitionStringIndex;
};

const useRepetionChecker = (repetitions: Repetition[]) => {
  const [currentRepetitionIndex, setCurrentRepetitionIndex] = useState<number>(0);
  const [currentRepetition, setCurrentRepetition] = useState<string>('');
  const [currentRepetitionStringIndex, setCurrentRepetitionStringIndex] = useState<number>(0);

  const [userInputSentence, setUserInputSentence] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const [isGradeContainerOpen, setIsGradeContainerOpen] = useState<boolean>(false);
  const [isExcerciseFinished, setExcerciseFinished] = useState<boolean>(false);

  const checkRepetition = () => {
    const cleanedUserInput = userInputSentence.trim().toLowerCase();
    const isInputCorrect = cleanedUserInput === currentRepetition.toLowerCase();
    if (isInputCorrect) {
      setResult("Correct! It's a repetition.");
      setCurrentRepetitionStringIndex(() => 0);
    } else {
      setResult("Try again. It's not a repetition.");
    }
    setIsGradeContainerOpen(() => true);
  };

  const checkHint = () => {
    const canBeIncremented = currentRepetition.length >= currentRepetitionStringIndex + 1;
    const isUserInputNotEmpty = currentRepetitionStringIndex !== 0;
    if (isUserInputNotEmpty) {
      setUserInputSentence((actualInput) =>
        canBeIncremented ? actualInput + currentRepetition[currentRepetitionStringIndex] : actualInput,
      );
    } else {
      setUserInputSentence(() => currentRepetition[currentRepetitionStringIndex]);
    }
    setCurrentRepetitionStringIndex((index) => (canBeIncremented ? index + 1 : index));
  };

  const incrementCurrentRepetitionIndex = () => {
    const nextIndex = currentRepetitionIndex + 1;
    const lastIndex = repetitions.length - 1;
    const canBeIncremented = nextIndex <= lastIndex;
    setCurrentRepetitionIndex((prev) => (canBeIncremented ? prev + 1 : 0));
  };

  const assessResult = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.textContent);
    incrementCurrentRepetitionIndex();
    setIsGradeContainerOpen(() => false);
    setUserInputSentence(() => '');
  };

  useEffect(() => {
    const expectedIndexOfHint = whatIndexShouldBe(userInputSentence, currentRepetition);
    setCurrentRepetitionStringIndex(() => expectedIndexOfHint);
  }, [userInputSentence, currentRepetition]);

  useEffect(() => {
    if (repetitions.length) {
      const isNotLastRepetitionToExcercise = currentRepetitionIndex !== repetitions.length - 1;
      if (isNotLastRepetitionToExcercise) {
        setExcerciseFinished(() => false);
        setCurrentRepetition(() => repetitions[currentRepetitionIndex].content);
      } else {
        setExcerciseFinished(() => true);
      }
    }
  }, [currentRepetitionIndex]);

  return {
    result,
    userInputSentence,
    setUserInputSentence,
    checkHint,
    checkRepetition,
    currentRepetition,
    currentRepetitionIndex,
    isGradeContainerOpen,
    assessResult,
    isExcerciseFinished,
  };
};

export default useRepetionChecker;
