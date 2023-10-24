import AuthForm from '@/features/auth/AuthForm';

export default function LoginPage() {
  return (
    <div className="auth-page">
      <img className="auth-page__image" src="/login-page-cover.png" alt="Cover for login page" />
      <div className="auth-page__wrapper">
        <h1 className="auth-page__heading">
          <span>Log in</span> to your account:
        </h1>
        <AuthForm />
      </div>
    </div>
  );
}
