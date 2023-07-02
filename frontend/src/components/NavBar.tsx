import { Link } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import ThemeInput from './ThemeInput';

export default function NavBar() {
  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/dictionary">Dictionary</Link>
        <Link to="/user-repetitions">User</Link>
      </ul>
      <AuthForm />
      <ThemeInput />
    </nav>
  );
}
