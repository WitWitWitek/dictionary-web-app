import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { RootState } from '../store';
import { logIn, logOut } from '@/features/auth/authSlice';

const QUERY_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3500' : 'https://dictionary-web-app.pl';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: QUERY_URL,
  credentials: 'include',
  mode: 'same-origin',
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth;
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', QUERY_URL);
    headers.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, DELETE, PATCH');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result!.error && result!.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
        if (refreshResult.data) {
          const { accessToken } = refreshResult.data as { accessToken: string };
          api.dispatch(logIn({ accessToken }));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  tagTypes: ['Repetition', 'User'],
  endpoints: () => ({}),
});

export default apiSlice;
