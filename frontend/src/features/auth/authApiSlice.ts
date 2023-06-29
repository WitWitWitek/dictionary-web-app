import apiSlice from '../../app/api/apiSlice';
import { logIn } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ username, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { username, password },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        const { accessToken } = data;
        dispatch(logIn({ accessToken }));
      },
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
