import apiSlice from '../../app/api/apiSlice';

interface SignUpRequest {
  username: string;
  email?: string;
  password: string;
  newPassword?: string;
}

interface SignUpResponse {
  message: string;
  error?: {
    data: {
      message: string;
    };
    status: number;
  };
}

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
