import useTheme from '../hooks/useTheme';

type ThemeProps = {
  theme: Theme,
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
};

export default function ThemeInput({ theme, setTheme }: ThemeProps) {
  const { themeHandler } = useTheme(setTheme);
  return (
    <div className="theme-toggle">
      <input
        type="range"
        step="1"
        min="1"
        max="2"
        onChange={themeHandler}
        value={theme === 'light' ? 1 : 2}
      />
    </div>
  );
}
