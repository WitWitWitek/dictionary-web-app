import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ThemeInput from '../ui/ThemeInput';
import { selectCurrentUser } from '@/features/auth/authSlice';

type Props = {
  toggleIsMenuVisible: () => void;
};

export default function NavMenu({ toggleIsMenuVisible }: Props) {
  const user = useSelector(selectCurrentUser);
  return (
    <nav className="navbar__mobile-menu">
      {user && (
        <Link to="/user-repetitions" onClick={toggleIsMenuVisible}>
          User
        </Link>
      )}
      {!user ? (
        <>
          <p>
            <Link to="/login" onClick={toggleIsMenuVisible}>
              Log in
            </Link>
          </p>
          <p>
            <Link to="/sign-up" onClick={toggleIsMenuVisible}>
              Sign up
            </Link>
          </p>
        </>
      ) : (
        <Link to="/login" onClick={toggleIsMenuVisible}>
          {user}
        </Link>
      )}
      <ThemeInput />
    </nav>
  );
}
