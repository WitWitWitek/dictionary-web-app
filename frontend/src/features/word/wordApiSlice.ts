import apiSlice from '../../app/api/apiSlice';

export const wordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRepetitions: builder.query<GetRepetitionsResponse, void>({
      query: () => ({
        url: '/repetitions',
      }),
      providesTags: ['Word'],
    }),
    postRepetition: builder.mutation({
      query: ({ content }) => ({
        url: '/repetitions',
        method: 'POST',
        body: { content },
      }),
      invalidatesTags: ['Word'],
    }),
  }),
});

export const { useGetAllRepetitionsQuery, usePostRepetitionMutation } = wordApiSlice;
