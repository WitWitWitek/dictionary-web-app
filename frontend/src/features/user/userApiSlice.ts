import apiSlice from '../../app/api/apiSlice';
import { SignUpRequest, SignUpResponse } from '../../types';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewUser: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (credentials) => ({
        url: '/user/sign-up',
        method: 'POST',
        body: { ...credentials },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useCreateNewUserMutation } = userApiSlice;
