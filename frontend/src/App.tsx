import './App.scss';
import { useState } from 'react';
import ThemeInput from './components/ThemeInput';
import WordSearch from './features/word/WordSearch';

function App() {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <main className={`theme-${theme}`}>
      <ThemeInput theme={theme} setTheme={setTheme} />
      <WordSearch />
    </main>
  );
}

export default App;
