import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '@/features/auth/authSlice';

export default function AuthLayout() {
  const token = useSelector(selectCurrentToken);
  return token ? <Outlet /> : <Navigate to="/dictionary" replace />;
}
