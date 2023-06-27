import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
  tagTypes: ['User'],
  endpoints: () => ({}),
});

export default apiSlice;
