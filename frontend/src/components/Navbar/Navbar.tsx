import { HiOutlineAcademicCap } from 'react-icons/hi';
import NavMobile from './NavMobile';
import NavbarLink from '../ui/NavbarLink';

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <NavbarLink to="/" desktop>
          <span>
            <HiOutlineAcademicCap />
          </span>
          Home
        </NavbarLink>
        <NavbarLink to="/dictionary" desktop>
          Dictionary
        </NavbarLink>
      </ul>
      <NavMobile />
    </nav>
  );
}
