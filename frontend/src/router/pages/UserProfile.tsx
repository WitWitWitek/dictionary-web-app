import { Link } from 'react-router-dom';

type Props = {};

export default function UserProfile() {
  return (
    <div className="user-profile">
      <h1>Your profile:</h1>
      <div>
        <h2>Username:</h2>
        <p>Repetitions amount:</p>
        <p>Excercises done:</p>
      </div>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/user-repetitions">Your Repetitions</Link>
      <div>
        <h3>Change Password:</h3>
      </div>
    </div>
  );
}
