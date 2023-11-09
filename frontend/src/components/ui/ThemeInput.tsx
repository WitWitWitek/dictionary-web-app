import { useSelector } from 'react-redux';
import { selectTheme } from '@/app/themeSlice';
import useTheme from '@/hooks/useTheme';

export default function ThemeInput() {
  const theme = useSelector(selectTheme);
  const { themeHandler } = useTheme();
  return (
    <div className="theme-toggle">
      <input type="range" step="1" min="1" max="2" onChange={themeHandler} value={theme === 'light' ? 1 : 2} />
    </div>
  );
}
