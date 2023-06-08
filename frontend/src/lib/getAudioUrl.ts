const getAudioUrl = (phonetics: Phonetic[]): string | null => {
  const phoneticObj = phonetics.find((phonetic) => phonetic.audio.length > 0);
  return phoneticObj ? phoneticObj.audio : null;
};

export default getAudioUrl;
