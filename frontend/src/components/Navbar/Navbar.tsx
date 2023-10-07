import { HiOutlineAcademicCap } from 'react-icons/hi';
import { useState } from 'react';
import NavMobile from './NavMobile';
import NavbarLink from '../ui/NavbarLink';

export default function NavBar() {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState<boolean>(false);

  const closeMobileMenuHandler = () => setIsMobileMenuVisible(() => false);

  return (
    <nav className="navbar">
      <ul>
        <NavbarLink to="/" desktop setIsMobileNavVisible={closeMobileMenuHandler}>
          <span>
            <HiOutlineAcademicCap />
          </span>
          Home
        </NavbarLink>
        <NavbarLink to="/dictionary" desktop setIsMobileNavVisible={closeMobileMenuHandler}>
          Dictionary
        </NavbarLink>
      </ul>
      <NavMobile isMenuVisible={isMobileMenuVisible} setIsMenuVisible={setIsMobileMenuVisible} />
    </nav>
  );
}
