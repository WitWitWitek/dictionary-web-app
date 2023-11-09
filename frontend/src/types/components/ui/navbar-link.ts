import { ReactNode } from 'react';

export type NavbarLinkProps = {
  to: string;
  desktop: boolean;
  children: ReactNode;
  setIsMobileNavVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
