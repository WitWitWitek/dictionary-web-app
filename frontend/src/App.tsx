import './App.scss';
import { useState } from 'react';
import ThemeInput from './components/ThemeInput';
import WordSearch from './features/word/WordSearch';

function App() {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <>
      <ThemeInput theme={theme} setTheme={setTheme} />
      <WordSearch theme={theme} />
    </>
  );
}

export default App;
