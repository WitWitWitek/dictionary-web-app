import '@/App.scss';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import NavBar from '@/components/Navbar/Navbar';
import { selectTheme } from '@/app/themeSlice';
import RefetchToken from '@/features/auth/RefetchToken';
import useTheme from '@/hooks/useTheme';

export default function RootLayout() {
  useTheme();
  const theme = useSelector(selectTheme);
  return (
    <main className={`theme-${theme}`}>
      <Toaster
        position="bottom-left"
        reverseOrder
        toastOptions={{
          style: {
            border: '2px solid #8d17e8',
          },
        }}
      />
      <NavBar />
      <section>
        <RefetchToken>
          <Outlet />
        </RefetchToken>
      </section>
    </main>
  );
}
