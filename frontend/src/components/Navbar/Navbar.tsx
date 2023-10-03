import { HiOutlineAcademicCap } from 'react-icons/hi';
import { useState } from 'react';
import NavMobile from './NavMobile';
import NavbarLink from '../ui/NavbarLink';

export default function NavBar() {
  const [isMobileMenuVisivle, setIsMobileMenuVisible] = useState<boolean>(false);

  const closeMobileMenuHandler = () => setIsMobileMenuVisible(() => false);

  return (
    <nav className="navbar">
      <ul>
        <NavbarLink to="/" desktop setMobileNavInvisible={closeMobileMenuHandler}>
          <span>
            <HiOutlineAcademicCap />
          </span>
          Home
        </NavbarLink>
        <NavbarLink to="/dictionary" desktop setMobileNavInvisible={closeMobileMenuHandler}>
          Dictionary
        </NavbarLink>
      </ul>
      <NavMobile isMenuVisible={isMobileMenuVisivle} setIsMenuVisible={setIsMobileMenuVisible} />
    </nav>
  );
}
