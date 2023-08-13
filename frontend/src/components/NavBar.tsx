import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthForm from '../features/auth/AuthForm';
import ThemeInput from './ThemeInput';
import { selectCurrentToken } from '../features/auth/authSlice';

export default function NavBar() {
  const token = useSelector(selectCurrentToken);

  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/dictionary">Dictionary</Link>
        {token && <Link to="/user-repetitions">User</Link>}
      </ul>
      <AuthForm />
      <ThemeInput />
    </nav>
  );
}
