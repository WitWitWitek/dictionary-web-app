import { ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '../app/themeSlice';
import { Theme } from '../types';

const getColorScheme = (): Theme => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

const useTheme = () => {
  const dispatch = useDispatch();
  const getLocalTheme = () => {
    const localStorageTheme = localStorage.getItem('theme');
    if (localStorageTheme === 'light' || localStorageTheme === 'dark') {
      dispatch(setTheme(localStorageTheme as Theme));
    } else {
      dispatch(setTheme(getColorScheme()));
    }
  };

  useEffect(() => {
    const queryString = '(prefers-color-scheme: light)';
    const handleColorSchemeChange = (e: MediaQueryListEvent) => dispatch(setTheme(e.matches ? 'light' : 'dark'));

    window.matchMedia(queryString).addEventListener('change', handleColorSchemeChange);

    return () => window.matchMedia(queryString).addEventListener('change', handleColorSchemeChange);
  }, []);

  useEffect(() => {
    getLocalTheme();
  }, []);

  const themeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputThemeValue: Theme = e.target.value === '1' ? 'light' : 'dark';
    dispatch(setTheme(inputThemeValue));
    localStorage.setItem('theme', inputThemeValue);
  };

  return {
    themeHandler,
  };
};

export default useTheme;
