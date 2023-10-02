import { ReactNode } from 'react';

export type NavbarLinkProps =
  | {
      to: string;
      desktop: false;
      children: ReactNode;
      setMobileNavVisible: () => void;
    }
  | {
      to: string;
      desktop: true;
      children: ReactNode;
      setMobileNavVisible?: () => void;
    };
