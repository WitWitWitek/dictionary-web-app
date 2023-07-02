import { useLoaderData } from 'react-router-dom';

export default function UserRepetitions() {
  const userData = useLoaderData();
  return <div>{userData as string}</div>;
}

export function loader() {
  return 'data';
}
