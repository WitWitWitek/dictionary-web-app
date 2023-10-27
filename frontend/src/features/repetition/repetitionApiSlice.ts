import { toast } from 'react-hot-toast';
import apiSlice from '@/app/api/apiSlice';
import { isErrorWithMessage } from '@/lib/apiErrorHandler';
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Repetition added.');
        } catch (err) {
          const toastMessage = isErrorWithMessage(err) ? err?.error?.data?.message : 'Try again later...';
          toast.error(toastMessage);
        }
      },
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
