import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectCurrentToken } from './authSlice';
import { useRefreshMutation } from './authApiSlice';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

type Props = {
  children: React.ReactElement;
};

export default function RefetchToken({ children }: Props) {
  const token = useSelector(selectCurrentToken);
  const [refresh, { isLoading }] = useRefreshMutation();

  useEffect(() => {
    const refetchAccessToken = async () => refresh('');
    if (!token) {
      refetchAccessToken();
    }
  }, []);

  return isLoading ? <LoadingSpinner /> : children;
}
