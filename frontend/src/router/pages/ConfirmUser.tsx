import { useSearchParams } from 'react-router-dom';
import { useVerifyUserMutation } from '@/features/user/userApiSlice';

export default function ConfirmUser() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [verifyUser] = useVerifyUserMutation();

  const verifyUserHandler = async () => {
    if (!token) return;
    await verifyUser({ emailToken: token });
  };

  return (
    <div className="auth-page">
      <img className="auth-page__image" src="/sign-up-page-cover.png" alt="Cover for sign up page" />
      <div className="auth-page__wrapper">
        <h1 className="auth-page__heading">
          <span>Confirm</span> your account:
        </h1>
        <button type="button" onClick={verifyUserHandler} className="form__submit-btn">
          Click to confirm account
        </button>
      </div>
    </div>
  );
}
