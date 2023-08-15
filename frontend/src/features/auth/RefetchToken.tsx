import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { selectCurrentToken } from './authSlice';
import { useRefreshMutation } from './authApiSlice';

type Props = {
  children: React.ReactNode;
};

export default function RefetchToken({ children }: Props) {
  const token = useSelector(selectCurrentToken);
  const [refresh, { isSuccess, isError, isLoading }] = useRefreshMutation();

  useEffect(() => {
    const refetchAccessToken = async () => refresh('');
    if (!token) {
      refetchAccessToken();
    }
  }, []);

  if (isSuccess || isError) {
    return <Outlet />;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return null;
}
