import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ThemeInput from './ThemeInput';
import { selectCurrentToken } from '@/features/auth/authSlice';

export default function NavBar() {
  const token = useSelector(selectCurrentToken);

  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/dictionary">Dictionary</Link>
        {token && <Link to="/user-repetitions">User</Link>}
      </ul>
      {!token ? (
        <div>
          <Link to="/login">Log in</Link> <Link to="/sign-up">Sign up</Link>
        </div>
      ) : (
        <Link to="/login">UserName</Link>
      )}
      <ThemeInput />
    </nav>
  );
}
