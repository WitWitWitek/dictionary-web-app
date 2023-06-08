import { FormEvent, useRef } from 'react';
import useDictionaryApi from '../../hooks/useDictionaryApi';

type Props = {
  setWordData: React.Dispatch<React.SetStateAction<WordData | null>>
};

export default function WordForm({ setWordData }: Props) {
  const wordRef = useRef<HTMLInputElement>(null);
  const { fetchData } = useDictionaryApi();

  const handleSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (wordRef.current) {
      setWordData(null);
      const word = wordRef.current.value;
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
