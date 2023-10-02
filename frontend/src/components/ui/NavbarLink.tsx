import { NavLink } from 'react-router-dom';
import { NavbarLinkProps } from '@/types';

function NavbarLink({ to, children, desktop, setMobileNavVisible }: NavbarLinkProps) {
  const navLinkBaseClass = desktop ? 'navbar__link' : 'navbar__mobile-menu-btn';
  return (
    <NavLink
      className={({ isActive }) => `${navLinkBaseClass}${isActive ? '--active' : ''}`}
      to={to}
      onClick={setMobileNavVisible}
    >
      {children}
    </NavLink>
  );
}

export default NavbarLink;
