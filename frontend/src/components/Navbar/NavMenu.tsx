import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Variants, motion } from 'framer-motion';
import ThemeInput from '../ui/ThemeInput';
import { selectCurrentUser } from '@/features/auth/authSlice';

type Props = {
  toggleIsMenuVisible: () => void;
};

const mobileNavVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function NavMenu({ toggleIsMenuVisible }: Props) {
  const user = useSelector(selectCurrentUser);
  return (
    <motion.nav variants={mobileNavVariants} initial="hidden" animate="visible" className="navbar__mobile-menu">
      {user && (
        <Link className="navbar__mobile-menu-btn" to="/user-repetitions" onClick={toggleIsMenuVisible}>
          Your profile
        </Link>
      )}
      {!user ? (
        <>
          <Link className="navbar__mobile-menu-btn" to="/login" onClick={toggleIsMenuVisible}>
            Log in
          </Link>
          <Link className="navbar__mobile-menu-btn" to="/sign-up" onClick={toggleIsMenuVisible}>
            Sign up
          </Link>
        </>
      ) : (
        <Link className="navbar__mobile-menu-btn" to="/login" onClick={toggleIsMenuVisible}>
          Log out
        </Link>
      )}
      <p className="navbar__mobile-menu-btn--theme">
        <ThemeInput />
        Chose the theme.
      </p>
    </motion.nav>
  );
}
