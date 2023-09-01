import { isErrorWithMessage } from '@/lib/apiErrorHandler';

type Props = {
  error: unknown;
};

export default function ErrorMessage({ error }: Props) {
  if (!isErrorWithMessage(error)) {
    return <div>Try again later...</div>;
  }
  return <div>{error.data.message}</div>;
}
