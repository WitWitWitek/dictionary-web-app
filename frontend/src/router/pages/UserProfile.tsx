import { Link } from 'react-router-dom';
import { useDeleteUserMutation, useGetUserDataQuery } from '@/features/user/userApiSlice';
import UpdatePasswordForm from '@/features/user/UpdatePasswordForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function UserProfile() {
  const { data: userData, isLoading } = useGetUserDataQuery();
  const [deleteUser] = useDeleteUserMutation();

  const deleteUserHandler = async () => deleteUser();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="user-profile">
      <h1 className="user-profile__heading">Your profile:</h1>
      <div className="user-profile__container user-profile__container--user">
        <h2>
          Username: <span className="user-profile__container-data">{userData?.username}</span>
        </h2>
        <p>
          Repetitions amount: <span className="user-profile__container-data">{userData?.repetitonsCount}</span>
        </p>
        <p>
          Excercises done: <span className="user-profile__container-data">{userData?.excercisesCount}</span>
        </p>
      </div>
      <div className="user-profile__container user-profile__container--menu">
        <h3>Repetitions menu:</h3>
        <Link to="/dashboard" className="user-profile__container-btn">
          Dashboard
        </Link>
        <Link to="/user-repetitions" className="user-profile__container-btn">
          Your Repetitions
        </Link>
      </div>
      <div className="user-profile__container user-profile__container--password">
        <h3>Change Password:</h3>
        <UpdatePasswordForm />
      </div>
      <div className="user-profile__container user-profile__container--delete">
        <h3>Delete your account:</h3>
        <button type="button" onClick={deleteUserHandler} className="user-profile__container-btn--delete">
          Delete
        </button>
      </div>
    </div>
  );
}
