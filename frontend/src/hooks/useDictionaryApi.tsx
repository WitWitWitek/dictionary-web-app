import { useState } from 'react';
import { WordData } from '../types';

const useDictionaryApi = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchData = async ({ word }: { word: string }): Promise<WordData | null> => {
    try {
      setIsError(false);
      setIsLoading(true);
      if (!word || word.trim() === '') {
        setIsError(true);
        throw new Error('An error occured');
      }
      const result = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!result.ok) {
        setIsError(true);
        throw new Error('An error occured');
      }
      setIsLoading(false);
      return (await result.json())[0];
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
      return null;
    }
  };
  return {
    fetchData,
    isError,
    isLoading,
  };
};

export default useDictionaryApi;
