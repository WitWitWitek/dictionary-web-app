import { ReactNode } from 'react';

export type NavbarLinkProps = {
  to: string;
  desktop: boolean;
  children: ReactNode;
  setMobileNavInvisible: () => void;
};
