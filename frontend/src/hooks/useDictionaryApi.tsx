import { useState } from 'react';
import { WordData } from '@/types';

const useDictionaryApi = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchData = async ({ word }: { word: string }): Promise<WordData | null> => {
    try {
      setErrorMessage(() => '');
      setIsError(false);
      setIsLoading(true);
      if (!word || word.trim() === '') {
        setIsError(true);
        throw new Error('Any input is required!');
      }
      const result = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!result.ok) {
        setIsError(true);
        throw new Error(
          result.status === 404
            ? `Sorry, we couldn't find definitions for the word you were looking for.`
            : 'An unknown error occured.',
        );
      }
      setIsLoading(false);
      return (await result.json())[0];
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
      if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string') {
        setErrorMessage(() => (err as { message: string }).message);
      }
      return null;
    }
  };
  return {
    fetchData,
    isError,
    errorMessage,
    isLoading,
  };
};

export default useDictionaryApi;
