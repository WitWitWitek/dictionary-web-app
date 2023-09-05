import { toast } from 'react-hot-toast';
import apiSlice from '@/app/api/apiSlice';
import { logIn, logOut } from './authSlice';
import { LoginRequest, LoginResponse } from '@/types';
import decodeJwtToken from '@/lib/decodeJwtToken';
import { isErrorWithMessage } from '@/lib/apiErrorHandler';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ username, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { username, password },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          const username = decodeJwtToken(accessToken);
          toast.success('User successfully logged in.');
          dispatch(logIn({ accessToken, username }));
        } catch (err) {
          dispatch(logOut());
          const toastMessage = isErrorWithMessage(err) ? err?.error?.data?.message : 'Try again later...';
          toast.error(toastMessage);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          const username = decodeJwtToken(accessToken);
          dispatch(logIn({ accessToken, username }));
        } catch (err) {
          dispatch(logOut());
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(logOut());
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } = authApiSlice;
