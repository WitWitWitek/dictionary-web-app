import { ChangeEvent, useEffect } from 'react';

type ThemeProps = {
  theme: Theme,
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
};
const themeRegExp = /dark|light/g;

export default function ThemeInput({ theme, setTheme }: ThemeProps) {
  const getColorScheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const getLocalTheme = () => {
    const localStorageTheme = localStorage.getItem('theme') || '';
    const isStoredThemeCorrect = themeRegExp.test(localStorageTheme);
    if (isStoredThemeCorrect) {
      setTheme(localStorageTheme as Theme);
    } else {
      setTheme(getColorScheme());
    }
  };

  useEffect(() => {
    getLocalTheme();
  }, []);

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', (e: MediaQueryListEvent) => setTheme(() => (e.matches ? 'light' : 'dark')));
  }, []);

  const themeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputThemeValue = e.target.value === '1' ? 'light' : 'dark';
    setTheme(() => inputThemeValue);
    localStorage.setItem('theme', inputThemeValue);
  };

  return (
    <input
      type="range"
      step="1"
      min="1"
      max="2"
      onChange={themeHandler}
      value={theme === 'light' ? 1 : 2}
    />
  );
}
