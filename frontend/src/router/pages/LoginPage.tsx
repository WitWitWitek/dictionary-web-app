import { useSelector } from 'react-redux';
import AuthForm from '@/features/auth/AuthForm';
import { selectCurrentToken } from '@/features/auth/authSlice';

export default function LoginPage() {
  const token = useSelector(selectCurrentToken);
  return (
    <div className="auth-page">
      <img className="auth-page__image" src="/login-page-cover.png" alt="Cover for login page" />
      <div className="auth-page__wrapper">
        <h1 className="auth-page__heading">
          {!token ? (
            <>
              <span>Log in</span> to your account:
            </>
          ) : (
            <>
              <span>Log out</span> from your account:
            </>
          )}
        </h1>
        <AuthForm />
      </div>
    </div>
  );
}
