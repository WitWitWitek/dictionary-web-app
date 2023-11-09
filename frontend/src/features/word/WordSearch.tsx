import { FormEvent, useState, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDictionaryApi from '@/hooks/useDictionaryApi';
import WordForm from './WordForm';
import WordOutput from './WordOutput/WordOutput';
import { WordData } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function WordSearch() {
  const [wordData, setWordData] = useState<WordData | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const firstRun = useRef(true);
  const wordRef = useRef<HTMLInputElement>(null);
  const { fetchData, isError, isLoading, errorMessage } = useDictionaryApi();

  useMemo(async () => {
    const query = searchParams.get('query');
    if (query && firstRun.current === true) {
      const data = await fetchData({ word: query });
      setWordData(data);
    }
    firstRun.current = false;
  }, [searchParams]);

  const fetchWordData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (wordRef.current) {
      setWordData(null);
      const word = wordRef.current.value;
      setSearchParams(() => ({
        query: word,
      }));
      const data = await fetchData({ word });
      setWordData(data);
    }
  };

  return (
    <section>
      <WordForm fetchWordData={fetchWordData} isError={isError} errorMessage={errorMessage} wordRef={wordRef} />
      {isLoading ? <LoadingSpinner /> : <WordOutput wordData={wordData} />}
    </section>
  );
}
