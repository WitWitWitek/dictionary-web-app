import { useSelector } from 'react-redux';
import { Variants, motion } from 'framer-motion';
import ThemeInput from '../ui/ThemeInput';
import { selectCurrentUser } from '@/features/auth/authSlice';
import NavbarLink from '../ui/NavbarLink';

type Props = {
  setIsMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const mobileNavVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function NavMenu({ setIsMenuVisible }: Props) {
  const user = useSelector(selectCurrentUser);
  return (
    <motion.nav variants={mobileNavVariants} initial="hidden" animate="visible" className="navbar__mobile-menu">
      {user && (
        <NavbarLink to="/user-repetitions" desktop={false} setIsMobileNavVisible={setIsMenuVisible}>
          Your profile
        </NavbarLink>
      )}
      {!user ? (
        <>
          <NavbarLink to="/login" desktop={false} setIsMobileNavVisible={setIsMenuVisible}>
            Log in
          </NavbarLink>
          <NavbarLink to="/sign-up" desktop={false} setIsMobileNavVisible={setIsMenuVisible}>
            Sign up
          </NavbarLink>
        </>
      ) : (
        <NavbarLink to="/login" desktop={false} setIsMobileNavVisible={setIsMenuVisible}>
          Log out
        </NavbarLink>
      )}
      <div className="navbar__mobile-menu-btn--theme">
        <ThemeInput />
        Chose the theme.
      </div>
    </motion.nav>
  );
}
