import NewUserForm from '@/features/user/NewUserForm';

export default function SignUpPage() {
  return (
    <div className="auth-page">
      <img className="auth-page__image" src="/sign-up-page-cover.png" alt="Cover for sign up page" />
      <div className="auth-page__wrapper">
        <h1 className="auth-page__heading">
          <span>Create</span> your account:
        </h1>
        <NewUserForm />
      </div>
    </div>
  );
}
