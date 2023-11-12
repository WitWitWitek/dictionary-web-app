import { toast } from 'react-hot-toast';
import apiSlice from '@/app/api/apiSlice';
import { isErrorWithMessage } from '@/lib/apiErrorHandler';
import {
  GetRepetitionsResponse,
  PostRepetitionRequest,
  AssessRepetitionRequest,
  BasicRepetitionResponse,
  DeleteRepetitionRequest,
  AddTranslationRequest,
  GetRepetitionsRequest,
  Repetition,
} from '@/types';

export const repetitionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRepetitions: builder.query<GetRepetitionsResponse, GetRepetitionsRequest>({
      query: ({ page }) => ({
        url: `/repetitions/?page=${page ?? 1}`,
      }),
      providesTags: ['Repetition'],
    }),
    getTodayRepetitions: builder.query<Repetition[], void>({
      query: () => ({
        url: '/repetitions/today-repetitions',
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
      async onQueryStarted(_, { queryFulfilled }) {
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
    }),
    addTranslationToRepetition: builder.mutation<BasicRepetitionResponse, AddTranslationRequest>({
      query: ({ id, translation }) => ({
        url: `/repetitions/${id}/translation`,
        method: 'PATCH',
        body: { translation },
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
  useGetTodayRepetitionsQuery,
  usePostRepetitionMutation,
  useAsssessRepetitionMutation,
  useAddTranslationToRepetitionMutation,
  useDeleteRepetitionMutation,
} = repetitionApiSlice;
