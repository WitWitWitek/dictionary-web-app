import { toast } from 'react-hot-toast';
import apiSlice from '@/app/api/apiSlice';
import { SignUpRequest, SignUpResponse } from '@/types';
import { isErrorWithMessage } from '@/lib/apiErrorHandler';

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
  }),
});

export const { useCreateNewUserMutation } = userApiSlice;
