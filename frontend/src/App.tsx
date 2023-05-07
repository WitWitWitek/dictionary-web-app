import { FormEvent, ChangeEvent, useState } from 'react';
import './App.css';
import useDictionaryApi from './hooks/useDictionaryApi';

function App() {
  const [word, setWord] = useState<string>('');
  const { fetchData } = useDictionaryApi();

  const onWordInputChange = (e: ChangeEvent<HTMLInputElement>) => setWord(e.target.value);

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await fetchData({ word });
    console.log(data[0].phonetic);
  };

  return (
    <form onSubmit={handleSubmission}>
      <input
        type="text"
        name="word"
        onChange={onWordInputChange}
        value={word}
      />
      <button type="submit">search</button>
    </form>
  );
}

export default App;
