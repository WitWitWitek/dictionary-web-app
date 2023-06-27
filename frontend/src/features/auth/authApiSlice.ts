import apiSlice from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ username, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { username, password },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
