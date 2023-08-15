import '../App.scss';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar';
import { selectTheme } from '../app/themeSlice';
import RefetchToken from '../features/auth/RefetchToken';

export default function RootLayout() {
  const theme = useSelector(selectTheme);
  return (
    <main className={`theme-${theme}`}>
      <NavBar />
      <RefetchToken>
        <Outlet />
      </RefetchToken>
    </main>
  );
}
