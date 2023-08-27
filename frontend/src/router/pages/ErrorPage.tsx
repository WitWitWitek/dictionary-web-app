import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from '@/components/NavBar';
import { selectTheme } from '@/app/themeSlice';

export default function ErrorPage() {
  const theme = useSelector(selectTheme);
  return (
    <main className={`theme-${theme}`}>
      <NavBar />
      <h1>Page not found</h1>
      <Link to="/">Go to homepage</Link>
    </main>
  );
}
