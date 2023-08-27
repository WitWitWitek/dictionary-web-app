import { FormEvent, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDictionaryApi from '../../hooks/useDictionaryApi';
import SearchIcon from '../../assets/SearchIcon';
import { WordData } from '../../types';

type Props = {
  setWordData: React.Dispatch<React.SetStateAction<WordData | null>>;
};

export default function WordForm({ setWordData }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const firstRun = useRef(true);
  const wordRef = useRef<HTMLInputElement>(null);
  const { fetchData, isError } = useDictionaryApi();
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
    <>
      <form className="search-form" onSubmit={handleSubmission}>
        <input
          className="search-form__input"
          type="text"
          name="word"
          ref={wordRef}
          placeholder="Search for any word..."
        />
        <div className="search-form__button-container">
          <button type="submit">
            <SearchIcon />
          </button>
        </div>
      </form>
      {isError && <p>Error occured.</p>}
    </>
  );
}
