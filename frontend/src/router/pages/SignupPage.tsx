import { FaUserPlus } from 'react-icons/fa';
import NewUserForm from '@/features/user/NewUserForm';

export default function SignUpPage() {
  return (
    <div className="auth-page">
      <div className="auth-page__image">
        <FaUserPlus />
      </div>
      <h1 className="auth-page__heading">Please, create your account:</h1>
      <NewUserForm />
    </div>
  );
}
