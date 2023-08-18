import apiSlice from '../../app/api/apiSlice';

export const repetitionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRepetitions: builder.query<GetRepetitionsResponse, void>({
      query: () => ({
        url: '/repetitions',
      }),
      providesTags: ['Repetition'],
    }),
    postRepetition: builder.mutation<{ message: string }, { content: string }>({
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
