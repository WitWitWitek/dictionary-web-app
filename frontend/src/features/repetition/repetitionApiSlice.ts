import apiSlice from '@/app/api/apiSlice';
import {
  GetRepetitionsResponse,
  PostRepetitionRequest,
  PostRepetitionResponse,
  AssessRepetitionRequest,
  AssessRepetitionResponse,
} from '@/types';

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
    asssessRepetition: builder.mutation<AssessRepetitionResponse, AssessRepetitionRequest>({
      query: ({ id, repetitionScore }) => ({
        url: `/repetitions/${id}/score`,
        method: 'PATCH',
        body: { repetitionScore },
      }),
    }),
  }),
});

export const { useGetAllRepetitionsQuery, usePostRepetitionMutation, useAsssessRepetitionMutation } =
  repetitionApiSlice;
