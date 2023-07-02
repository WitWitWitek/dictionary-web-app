import { FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { useLoginMutation, useLogoutMutation } from './authApiSlice';
import { selectCurrentToken } from './authSlice';

export default function AuthForm() {
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const userToken = useSelector(selectCurrentToken);

  const signInHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    // refactor needed
    const logInDetails = {
      ...Object.fromEntries(formData),
    } as unknown as LoginRequest;
    await login({ ...logInDetails });
  };

  const signOutHandler = () => logout('');

  if (userToken)
    return (
      <button type="button" onClick={signOutHandler}>
        log out
      </button>
    );
  return (
    <form onSubmit={signInHandler}>
      <input type="text" name="username" />
      <input type="password" name="password" />
      <button type="submit">sign in</button>
    </form>
  );
}
