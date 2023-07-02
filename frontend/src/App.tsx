import './App.scss';
import { useState } from 'react';
import ThemeInput from './components/ThemeInput';
import WordSearch from './features/word/WordSearch';
import AuthForm from './features/auth/AuthForm';

function App() {
  const [theme, setTheme] = useState<Theme>('light');
  return (
    <main className={`theme-${theme}`}>
      <nav>
        <AuthForm />
        <ThemeInput theme={theme} setTheme={setTheme} />
      </nav>
      <WordSearch />
    </main>
  );
}

export default App;
