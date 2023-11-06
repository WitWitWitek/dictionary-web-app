import { Link } from 'react-router-dom';
import { useGetUserDataQuery } from '@/features/user/userApiSlice';

export default function UserProfile() {
  const { data: userData, isLoading } = useGetUserDataQuery();

  if (isLoading) {
    return <div className="user-profile">Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h1>Your profile:</h1>
      <div>
        <h2>Username:</h2>
        <p>Repetitions amount: {userData?.repetitonsCount}</p>
        <p>Excercises done: {userData?.excercisesCount}</p>
      </div>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/user-repetitions">Your Repetitions</Link>
      <div>
        <h3>Change Password:</h3>
      </div>
    </div>
  );
}
