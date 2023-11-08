import { FormEvent } from 'react';
import SearchIcon from '@/assets/SearchIcon';
import SearchError from './WordOutput/SearchError/SearchError';

type Props = {
  fetchWordData: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  isError: boolean;
  errorMessage: string;
  wordRef: React.RefObject<HTMLInputElement>;
};

export default function WordForm({ fetchWordData, isError, errorMessage, wordRef }: Props) {
  return (
    <>
      <form className="search-form" onSubmit={fetchWordData}>
        <input
          className="search-form__input"
          type="text"
          name="word"
          ref={wordRef}
          placeholder="Search for any word..."
          required
        />
        <div className="search-form__button-container">
          <button type="submit">
            <SearchIcon />
          </button>
        </div>
      </form>
      {isError && <SearchError errorMessage={errorMessage} />}
    </>
  );
}
