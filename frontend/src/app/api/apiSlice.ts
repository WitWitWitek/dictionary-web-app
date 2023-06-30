import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RootState } from '../store';

const URL_QUERY = process.env.NODE_ENV !== 'production' ? 'http://localhost:3500' : '';

const baseQuery = fetchBaseQuery({
  baseUrl: URL_QUERY,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
//   args,
//   api,
//   extraOptions,
// ) => baseQuery(args, api, extraOptions);

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});

export default apiSlice;
