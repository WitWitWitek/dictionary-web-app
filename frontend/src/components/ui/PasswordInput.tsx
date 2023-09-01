import { useState } from 'react';
import { PasswordInputProps } from '@/types';

export default function PasswordInput({ ...props }: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <>
      <input type={!isPasswordVisible ? 'password' : 'text'} {...props} />
      <button type="button" onClick={() => setIsPasswordVisible((prev) => !prev)}>
        👀
      </button>
    </>
  );
}
