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

  const [userInputSentence, setUserInputSentence] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const [isGradeContainerOpen, setIsGradeContainerOpen] = useState<boolean>(false);
  const [isExcerciseFinished, setExcerciseFinished] = useState<boolean>(false);

  const checkRepetition = () => {
    const cleanedUserInput = userInputSentence.trim().toLowerCase();
    const isInputCorrect = cleanedUserInput === currentRepetition.toLowerCase();
    if (isInputCorrect) {
      setResult("Correct! It's a repetition.");
      setCurrentRepetitionIndex(() => 0);
    } else {
      setResult("Try again. It's not a repetition.");
    }
    setIsGradeContainerOpen(() => true);
  };

  const checkHint = () => {
    const canBeIncremented = currentRepetition.length >= currentRepetitionIndex + 1;
    const isUserInputNotEmpty = currentRepetitionIndex !== 0;
    if (isUserInputNotEmpty) {
      setUserInputSentence((actualInput) =>
        canBeIncremented ? actualInput + currentRepetition[currentRepetitionIndex] : actualInput,
      );
    } else {
      setUserInputSentence(() => currentRepetition[currentRepetitionIndex]);
    }
    setCurrentRepetitionIndex((index) => (canBeIncremented ? index + 1 : index));
  };

  const incrementRepetitionsArrayIndex = () => {
    const futureIndex = repetitionsArrayIndex + 1;
    const lastIndex = repetitions.length - 1;
    const canBeIncremented = futureIndex <= lastIndex;
    setRepetitionsArrayIndex((prev) => (canBeIncremented ? prev + 1 : 0));
  };

  const assessResult = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.textContent);
    incrementRepetitionsArrayIndex();
    setIsGradeContainerOpen(() => false);
    setUserInputSentence(() => '');
  };

  useEffect(() => {
    const expectedIndexOfHint = whatIndexShouldBe(userInputSentence, currentRepetition);
    setCurrentRepetitionIndex(() => expectedIndexOfHint);
  }, [userInputSentence, currentRepetition]);

  useEffect(() => {
    if (repetitions.length) {
      const isNotLastRepetitionToExcercise = repetitionsArrayIndex !== repetitions.length - 1;
      if (isNotLastRepetitionToExcercise) {
        setExcerciseFinished(() => false);
        setCurrentRepetition(() => repetitions[repetitionsArrayIndex].content);
      } else {
        setExcerciseFinished(() => true);
      }
    }
  }, [repetitionsArrayIndex]);

  return {
    result,
    userInputSentence,
    setUserInputSentence,
    checkHint,
    checkRepetition,
    currentRepetition,
    repetitionsArrayIndex,
    isGradeContainerOpen,
    assessResult,
    isExcerciseFinished,
  };
};

export default useRepetionChecker;
