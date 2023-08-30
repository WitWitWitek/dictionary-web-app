import jwtDecode from 'jwt-decode';

const decodeJwtToken = (accessToken: string): string => {
  const { username } = jwtDecode<{ username: string }>(accessToken);
  return username;
};

export default decodeJwtToken;
