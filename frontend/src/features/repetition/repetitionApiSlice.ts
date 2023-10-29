import { toast } from 'react-hot-toast';
import apiSlice from '@/app/api/apiSlice';
import { isErrorWithMessage } from '@/lib/apiErrorHandler';
import {
  GetRepetitionsResponse,
  PostRepetitionRequest,
  AssessRepetitionRequest,
  BasicRepetitionResponse,
  DeleteRepetitionRequest,
} from '@/types';

export const repetitionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRepetitions: builder.query<GetRepetitionsResponse, void>({
      query: () => ({
        url: '/repetitions',
      }),
      providesTags: ['Repetition'],
    }),
    postRepetition: builder.mutation<BasicRepetitionResponse, PostRepetitionRequest>({
      query: ({ content, word }) => ({
        url: '/repetitions',
        method: 'POST',
        body: { content, word },
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
    asssessRepetition: builder.mutation<BasicRepetitionResponse, AssessRepetitionRequest>({
      query: ({ id, repetitionScore }) => ({
        url: `/repetitions/${id}/score`,
        method: 'PATCH',
        body: { repetitionScore },
      }),
      invalidatesTags: ['Repetition'],
    }),
    deleteRepetition: builder.mutation<BasicRepetitionResponse, DeleteRepetitionRequest>({
      query: ({ id }) => ({
        url: `/repetitions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Repetition'],
    }),
  }),
});

export const {
  useGetAllRepetitionsQuery,
  usePostRepetitionMutation,
  useAsssessRepetitionMutation,
  useDeleteRepetitionMutation,
} = repetitionApiSlice;
