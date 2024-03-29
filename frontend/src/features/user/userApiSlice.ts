import { toast } from 'react-hot-toast';
import apiSlice from '@/app/api/apiSlice';
import { ChangePasswordRequest, SignUpRequest, SignUpResponse, UserDataResponse, VerifyUserRequest } from '@/types';
import { isErrorWithMessage } from '@/lib/apiErrorHandler';
import { logOut } from '../auth/authSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewUser: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (credentials) => ({
        url: '/user/sign-up',
        method: 'POST',
        body: { ...credentials },
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('User successfully created.');
        } catch (err) {
          const toastMessage = isErrorWithMessage(err) ? err?.error?.data?.message : 'Try again later...';
          toast.error(toastMessage);
        }
      },
    }),
    getUserData: builder.query<UserDataResponse, void>({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    deleteUser: builder.mutation<void, void>({
      query: () => ({
        url: '/user',
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
          toast.success('User successfully deleted.');
        } catch (err) {
          const toastMessage = isErrorWithMessage(err) ? err?.error?.data?.message : 'Try again later...';
          toast.error(toastMessage);
        }
      },
    }),
    changePassword: builder.mutation<void, ChangePasswordRequest>({
      query: (credentials) => ({
        url: '/user/change-password',
        method: 'PATCH',
        body: { ...credentials },
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Password successfully updated.');
        } catch (err) {
          const toastMessage = isErrorWithMessage(err) ? err?.error?.data?.message : 'Try again later...';
          toast.error(toastMessage);
        }
      },
    }),
    verifyUser: builder.mutation<void, VerifyUserRequest>({
      query: ({ emailToken }) => ({
        url: `/user/confirm/${emailToken}`,
        method: 'GET',
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('User verified. Please log in.');
        } catch (err) {
          const toastMessage = isErrorWithMessage(err) ? err?.error?.data?.message : 'Try again later...';
          toast.error(toastMessage);
        }
      },
    }),
  }),
});

export const {
  useCreateNewUserMutation,
  useGetUserDataQuery,
  useDeleteUserMutation,
  useChangePasswordMutation,
  useVerifyUserMutation,
} = userApiSlice;
