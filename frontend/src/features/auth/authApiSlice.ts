import apiSlice from '../../app/api/apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query<LoginRequest, LoginResponse>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { credentials },
      }),
    }),
  }),
});

export default authApiSlice;
