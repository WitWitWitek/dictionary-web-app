import { Link } from 'react-router-dom';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import NavMobile from './NavMobile';

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <Link className="navbar__link" to="/">
          <span>
            <HiOutlineAcademicCap />
          </span>
          Home
        </Link>
        <Link className="navbar__link" to="/dictionary">
          Dictionary
        </Link>
      </ul>
      <NavMobile />
    </nav>
  );
}
