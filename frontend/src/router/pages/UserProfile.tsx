import { Link } from 'react-router-dom';
import { useDeleteUserMutation, useGetUserDataQuery } from '@/features/user/userApiSlice';

export default function UserProfile() {
  const { data: userData, isLoading } = useGetUserDataQuery();
  const [deleteUser] = useDeleteUserMutation();

  const deleteUserHandler = async () => deleteUser();

  if (isLoading) {
    return <div className="user-profile">Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h1>Your profile:</h1>
      <div>
        <h2>Username: {userData?.username}</h2>
        <p>Repetitions amount: {userData?.repetitonsCount}</p>
        <p>Excercises done: {userData?.excercisesCount}</p>
      </div>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/user-repetitions">Your Repetitions</Link>
      <div>
        <h3>Change Password:</h3>
      </div>
      <div>
        <h3>Delete your account:</h3>
        <button type="button" onClick={deleteUserHandler}>
          Delete
        </button>
      </div>
    </div>
  );
}
