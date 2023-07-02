import '../App.scss';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import AuthForm from '../features/auth/AuthForm';
import ThemeInput from '../components/ThemeInput';

export default function RootLayout() {
  const [theme, setTheme] = useState<Theme>('light');
  return (
    <main className={`theme-${theme}`}>
      <nav>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/dictionary">Dictionary</Link>
          <Link to="/user-repetitions">User</Link>
        </ul>
        <AuthForm />
        <ThemeInput theme={theme} setTheme={setTheme} />
      </nav>
      <Outlet />
    </main>
  );
}
