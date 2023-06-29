import { FormEvent } from 'react';
import { useLoginMutation } from './authApiSlice';

export default function AuthForm() {
  const [login] = useLoginMutation();

  const signInHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    // refactor needed
    const logInDetails = {
      ...Object.fromEntries(formData),
    } as unknown as LoginRequest;
    await login({ ...logInDetails });
  };

  return (
    <form onSubmit={signInHandler}>
      <input type="text" name="username" />
      <input type="password" name="password" />
      <button type="submit">sign in</button>
    </form>
  );
}
