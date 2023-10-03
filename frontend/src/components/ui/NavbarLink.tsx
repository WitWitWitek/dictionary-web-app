import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NavbarLinkProps } from '@/types';

function NavbarLink({ to, children, desktop, setMobileNavInvisible }: NavbarLinkProps) {
  const navLinkBaseClass = desktop ? 'navbar__link' : 'navbar__mobile-menu-btn';
  return (
    <NavLink
      className={({ isActive }) => `${navLinkBaseClass}${isActive ? '--active' : ''}`}
      to={to}
      onClick={setMobileNavInvisible}
    >
      {({ isActive }) => (
        <>
          {children}
          {desktop && isActive && <motion.div layoutId="link-indicator" className="navbar__link-indicator" />}
        </>
      )}
    </NavLink>
  );
}

export default NavbarLink;
