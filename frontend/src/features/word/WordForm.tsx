import { FormEvent, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import useDictionaryApi from '../../hooks/useDictionaryApi';

type Props = {
  setWordData: React.Dispatch<React.SetStateAction<WordData | null>>
};

export default function WordForm({ setWordData }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const firstRun = useRef(true);
  const wordRef = useRef<HTMLInputElement>(null);
  const { fetchData } = useDictionaryApi();

  useMemo(async () => {
    const query = searchParams.get('query');
    if (query && firstRun.current === true) {
      const data = await fetchData({ word: query });
      setWordData(data);
    }
    firstRun.current = false;
  }, [searchParams]);

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
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
    <form onSubmit={handleSubmission}>
      <input
        type="text"
        name="word"
        ref={wordRef}
      />
      <button type="submit">search</button>
    </form>
  );
}
