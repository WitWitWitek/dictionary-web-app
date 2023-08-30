import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ThemeInput from './ThemeInput';
import { selectCurrentUser } from '@/features/auth/authSlice';

export default function NavBar() {
  const user = useSelector(selectCurrentUser);

  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/dictionary">Dictionary</Link>
        {user && <Link to="/user-repetitions">User</Link>}
      </ul>
      {!user ? (
        <div>
          <Link to="/login">Log in</Link> <Link to="/sign-up">Sign up</Link>
        </div>
      ) : (
        <Link to="/login">{user}</Link>
      )}
      <ThemeInput />
    </nav>
  );
}
