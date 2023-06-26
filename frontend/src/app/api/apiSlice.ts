import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['User'],
  endpoints: () => ({}),
});
