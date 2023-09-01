import type { ComponentPropsWithoutRef } from 'react';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export type PasswordInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'>;
