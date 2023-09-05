import { FaUserCheck } from 'react-icons/fa';
import AuthForm from '@/features/auth/AuthForm';

export default function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-page__image">
        <FaUserCheck />
      </div>
      <h1 className="auth-page__heading">Please, log in to your account:</h1>
      <AuthForm />
    </div>
  );
}
