import type { ComponentPropsWithoutRef } from 'react';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export enum AuthInputType {
  username = 'text',
  password = 'password',
  email = 'email',
}

export type InputComponentProps = ComponentPropsWithoutRef<'input'>;
