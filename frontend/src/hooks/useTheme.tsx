import { ChangeEvent, useEffect } from 'react';

const getColorScheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

const useTheme = (themeCallback: React.Dispatch<React.SetStateAction<Theme>>) => {
  const getLocalTheme = () => {
    const localStorageTheme = localStorage.getItem('theme');
    if (localStorageTheme === 'light' || localStorageTheme === 'dark') {
      themeCallback(localStorageTheme as Theme);
    } else {
      themeCallback(getColorScheme());
    }
  };

  useEffect(() => {
    const queryString = '(prefers-color-scheme: light)';
    const handleColorSchemeChange = (e: MediaQueryListEvent) => themeCallback(() => (e.matches ? 'light' : 'dark'));

    window
      .matchMedia(queryString)
      .addEventListener('change', handleColorSchemeChange);

    return () => window
      .matchMedia(queryString)
      .addEventListener('change', handleColorSchemeChange);
  }, []);

  useEffect(() => {
    getLocalTheme();
  }, []);

  const themeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputThemeValue = e.target.value === '1' ? 'light' : 'dark';
    themeCallback(() => inputThemeValue);
    localStorage.setItem('theme', inputThemeValue);
  };

  return {
    themeHandler,
  };
};

export default useTheme;
