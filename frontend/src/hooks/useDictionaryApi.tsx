const useDictionaryApi = () => {
  const fetchData = async ({ word }: { word: string }): Promise<WordData[]> => {
    const result = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return result.json();
  };

  return { fetchData };
};

export default useDictionaryApi;
