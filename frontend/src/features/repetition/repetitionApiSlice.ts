import apiSlice from '@/app/api/apiSlice';
import { GetRepetitionsResponse, PostRepetitionRequest, PostRepetitionResponse } from '@/types';

export const repetitionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRepetitions: builder.query<GetRepetitionsResponse, void>({
      query: () => ({
        url: '/repetitions',
      }),
      providesTags: ['Repetition'],
    }),
    postRepetition: builder.mutation<PostRepetitionResponse, PostRepetitionRequest>({
      query: ({ content }) => ({
        url: '/repetitions',
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: ['Repetition'],
    }),
  }),
});

export const { useGetAllRepetitionsQuery, usePostRepetitionMutation } = repetitionApiSlice;
