import { FormEvent, ChangeEvent, useState } from 'react';
import './App.scss';
import useDictionaryApi from './hooks/useDictionaryApi';
import WordOutput from './features/word/WordOutput';

function App() {
  const [word, setWord] = useState<string>('');
  const [wordData, setWordData] = useState<WordData | null>(null);
  const { fetchData } = useDictionaryApi();

  const onWordInputChange = (e: ChangeEvent<HTMLInputElement>) => setWord(e.target.value);

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWordData(null);
    const data = await fetchData({ word });
    setWordData(data);
  };

  return (
    <>
      <form onSubmit={handleSubmission}>
        <input
          type="text"
          name="word"
          onChange={onWordInputChange}
          value={word}
        />
        <button type="submit">search</button>
      </form>
      {wordData && <WordOutput wordData={wordData} />}
    </>
  );
}

export default App;
